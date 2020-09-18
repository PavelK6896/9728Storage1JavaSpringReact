package app.web.pavelk.storage1.controllers;


import app.web.pavelk.storage1.entities.Client;
import app.web.pavelk.storage1.services.ClientService;
import app.web.pavelk.storage1.util.filter.ClientFilter;
import app.web.pavelk.storage1.util.filter.ClientFilterDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/client")
@Slf4j
public class ClientController {

    private ClientService clientService;
    private ObjectMapper objectMapper;

    @Autowired
    public void setObjectMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<Client> getClient(){
        log.info("getClient");
        return clientService.getClient();
    }

    @PostMapping(value = "/filter", consumes = "application/json", produces = "application/json")
    public List<Client> getClient(@RequestBody(required = false) String jsonString) throws JsonProcessingException {
        log.info("getClient filter");
        if (jsonString != null){
            ClientFilterDto clientFilterDto = objectMapper.readValue(jsonString, ClientFilterDto.class);
            ClientFilter clientFilter = new ClientFilter(clientFilterDto);
            return clientService.getClient(clientFilter.getSpec());
        }
        return clientService.getClient();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> add(@RequestBody Client client) {


        ResponseEntity<Client> tResponseEntity;
        if (client != null) {
            if(client.getId() == null){
                tResponseEntity = new ResponseEntity<>(clientService.save(client), HttpStatus.OK);
                log.info("add " + client.toString());
            }else{
                if (!clientService.existsById(client.getId())) {

                    tResponseEntity = new ResponseEntity<>(clientService.save(client), HttpStatus.OK);
                    log.info("add " + client.toString());
                } else {
                    tResponseEntity = new ResponseEntity<>(client, HttpStatus.ALREADY_REPORTED);
                    log.info("exists product " + client.toString());
                }
            }

        } else {
            tResponseEntity = new ResponseEntity<>(client, HttpStatus.NO_CONTENT);
            log.info("not product " + client.toString());
        }
        return tResponseEntity;
    }

    @PutMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> modifyProduct(@RequestBody Client client) {
        ResponseEntity<Client> tResponseEntity;
        if (client.getId() != null) {
            if (clientService.existsById(client.getId())) {
                tResponseEntity = new ResponseEntity<>(clientService.save(client), HttpStatus.OK);
                log.info("update " + client.toString());
            } else {
                tResponseEntity = new ResponseEntity<>(client, HttpStatus.NOT_FOUND);
                log.info("not product " + client.toString());
            }
        } else {
            tResponseEntity = new ResponseEntity<>(client, HttpStatus.NO_CONTENT);
            log.info("not product " + client.toString());
        }
        return tResponseEntity;
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Long id) {
        log.info("Delete id " + id);
        clientService.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

}
