package app.web.pavelk.storage1.services;

import app.web.pavelk.storage1.entities.Client;
import app.web.pavelk.storage1.repositories.ClientRepository;
import app.web.pavelk.storage1.util.report.ReportComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ClientService {
    private ClientRepository clientRepository;
    private ReportComponent reportComponent;

    @Autowired
    public void setUserRepository(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Autowired
    public void setReportComponent(ReportComponent reportComponent) {
        this.reportComponent = reportComponent;
    }

    public List<Client> getClient(){
        return clientRepository.findAll();
    }

    public List<Client> getClient(Specification<Client> spec){
        return clientRepository.findAll(spec);
    }

    @Transactional
    public void deleteById(Long id){
        if (existsById(id))
        clientRepository.deleteById(id);
    }

    public boolean existsById(Long id){
        return clientRepository.existsById(id);
    }

    public boolean existsByPhone(String phone){
        return clientRepository.existsByPhone(phone);
    }

    public Client save(Client client) {
        return clientRepository.save(client);
    }

    public ByteArrayOutputStream getReport() throws Exception {
       return reportComponent.getReport1(getClient());
    }


}
