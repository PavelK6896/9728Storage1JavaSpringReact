package app.web.pavelk.storage1.services;

import app.web.pavelk.storage1.entities.Client;
import app.web.pavelk.storage1.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    private ClientRepository clientRepository;

    @Autowired
    public void setUserRepository(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }


    public List<Client> getClient(){
        return clientRepository.findAll();
    }

    public void deleteById(Long id){
        clientRepository.deleteById(id);
    }

    public boolean existsById(Long id){
        return clientRepository.existsById(id);
    }

    public Client save(Client client) {
        return clientRepository.save(client);
    }
}
