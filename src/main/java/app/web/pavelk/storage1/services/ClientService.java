package app.web.pavelk.storage1.services;

import app.web.pavelk.storage1.entities.Client;
import app.web.pavelk.storage1.repositories.ClientRepository;
import app.web.pavelk.storage1.util.report.ReportComponent;
import app.web.pavelk.storage1.util.report.ReportStAXComponent;
import app.web.pavelk.storage1.util.report.ReportXmlComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final ReportComponent reportComponent;
    private final ReportXmlComponent reportXmlComponent;
    private final ReportStAXComponent reportStAXComponent;
    Specification<Client> specification;
    List<Client> list;

    @Autowired
    public ClientService(ClientRepository clientRepository, ReportComponent reportComponent,
                         ReportXmlComponent reportXmlComponent, ReportStAXComponent reportStAXComponent
    ) {
        this.clientRepository = clientRepository;
        this.reportComponent = reportComponent;
        this.reportXmlComponent = reportXmlComponent;
        this.reportStAXComponent = reportStAXComponent;
        this.specification = null;
        this.list = null;
    }


    public List<Client> getClient() {
        specification = null;
        return list = clientRepository.findAll();
    }

    public List<Client> getClient(Specification<Client> spec) {
        specification = spec;
        return list = clientRepository.findAll(spec);
    }

    @Transactional
    public void deleteById(Long id) {
        if (existsById(id))
            clientRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return clientRepository.existsById(id);
    }

    public boolean existsByPhone(String phone) {
        return clientRepository.existsByPhone(phone);
    }

    public Client save(Client client) {
        return clientRepository.save(client);
    }

    public ByteArrayOutputStream getReportOdt() throws Exception {
        return reportComponent.getReportOdt(isListClientCash());
    }

    public ByteArrayOutputStream getReportXml() throws Exception {
        return reportStAXComponent.getReportXml(isListClientCash());
    }

    public ByteArrayOutputStream getReportXml2() throws Exception {
        return reportXmlComponent.getReportXml(isListClientCash());
    }

    //кешировать результаты фильтра в оперативке
    public List<Client> isSpecificationGetClient() {
        if (specification != null) {
            return getClient(specification);
        }
        return getClient();
    }

    //кешировать список клиентов в оперативке
    public List<Client> isListClientCash() {
        if (list != null) {
            return list;
        }
        return getClient();
    }

}
