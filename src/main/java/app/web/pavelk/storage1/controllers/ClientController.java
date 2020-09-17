package app.web.pavelk.storage1.controllers;


import app.web.pavelk.storage1.entities.Client;
import app.web.pavelk.storage1.services.ClientService;
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

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<Client> getClient() {
        log.info("getClient");
        return clientService.getClient();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> add(@RequestBody Client client) {
        ResponseEntity<Client> tResponseEntity;
        if (client != null) {
            if (!clientService.existsById(client.getId())) {
                tResponseEntity = new ResponseEntity<>(clientService.save(client), HttpStatus.OK);
                log.info("add " + client.toString());
            } else {
                tResponseEntity = new ResponseEntity<>(client, HttpStatus.ALREADY_REPORTED);
                log.info("exists product " + client.toString());
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
    public void delete(@PathVariable(value = "id") Long id) {
        log.info("Delete id " + id);
        clientService.deleteById(id);
    }

}
