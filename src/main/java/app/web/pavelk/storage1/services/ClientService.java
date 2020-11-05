package app.web.pavelk.storage1.services;

import app.web.pavelk.storage1.entities.Client;
import app.web.pavelk.storage1.repositories.ClientRepository;
import app.web.pavelk.storage1.util.report.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;
    private final ReportComponent reportComponent;
    private final ReportXmlComponent reportXmlComponent;
    private final ReportStAXComponent reportStAXComponent;
    private final ReportTxtComponent reportTxtComponent;
    private final ReportPdfComponent reportPdfComponent;
    private final ReportDocxComponent reportDocxComponent;
    private final ReportXlsxComponent reportXlsxComponent;
    Specification<Client> specification = null;
//    List<Client> list = null;

    public List<Client> getClient() {
        specification = null;
        return clientRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public List<Client> getClient(Specification<Client> spec) {
        specification = spec;
        return clientRepository.findAll(spec, Sort.by(Sort.Direction.ASC, "id"));
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
        return reportComponent.getReportOdt(isSpecificationGetClient());
    }

    public ByteArrayOutputStream getReportXml() throws Exception {
        return reportStAXComponent.getReportXml(isSpecificationGetClient());
    }

    public ByteArrayOutputStream getReportXml2() throws Exception {
        return reportXmlComponent.getReportXml(isSpecificationGetClient());
    }

    public ByteArrayOutputStream getReportTxt() throws Exception {
        return reportTxtComponent.getReportTxt(isSpecificationGetClient());
    }


    public ByteArrayOutputStream getReportPdf() throws Exception {
        return reportPdfComponent.getReportPdf(isSpecificationGetClient());
    }

    public ByteArrayOutputStream getReportDocx() throws Exception {
        return reportDocxComponent.getReportDocx(isSpecificationGetClient());
    }

    public ByteArrayOutputStream getReportXlsx() throws Exception {
        return reportXlsxComponent.getReportXlsx(isSpecificationGetClient());
    }

    //кешировать результаты фильтра в оперативке
    public List<Client> isSpecificationGetClient() {
        if (specification != null) {
            return getClient(specification);
        }
        return getClient();
    }

    //кешировать список клиентов в оперативке
//    public List<Client> isListClientCash() {
//        if (list != null) {
//            return list;
//        }
//        return getClient();
//    }

}
