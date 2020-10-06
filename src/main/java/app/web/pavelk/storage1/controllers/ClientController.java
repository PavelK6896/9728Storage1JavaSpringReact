package app.web.pavelk.storage1.controllers;


import app.web.pavelk.storage1.entities.Client;
import app.web.pavelk.storage1.services.ClientService;
import app.web.pavelk.storage1.util.filter.ClientFilter;
import app.web.pavelk.storage1.util.filter.ClientFilterDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
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
    public List<Client> getClient() {
        log.info("getClient");
        return clientService.getClient();
    }

    @PostMapping(value = "/filter", consumes = "application/json", produces = "application/json")
    public List<Client> getClient(@RequestBody(required = false) String jsonString) throws JsonProcessingException {
        log.info("getClient filter");
        if (jsonString != null) {
            ClientFilterDto clientFilterDto = objectMapper.readValue(jsonString, ClientFilterDto.class);
            ClientFilter clientFilter = new ClientFilter(clientFilterDto);
            return clientService.getClient(clientFilter.getSpec());
        }
        return clientService.getClient();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> add(@RequestBody Client client) {
        log.info("PostMapping! " + client);
        ResponseEntity<?> tResponseEntity;

        if (client != null) {
            if (client.getPhone() != null) {
                if (!clientService.existsByPhone(client.getPhone())) {
                    client.setId(null);
                    tResponseEntity = new ResponseEntity<>(clientService.save(client), HttpStatus.OK);
                } else {
                    //такой телефон уже есть
                    tResponseEntity = ResponseEntity
                            .status(HttpStatus.NO_CONTENT).contentType(MediaType.TEXT_PLAIN)
                            .body("phone exists");
                }
            } else {
                //нет телефона
                tResponseEntity = ResponseEntity
                        .status(HttpStatus.NO_CONTENT)
                        .body("not phone");
            }
        } else {
            tResponseEntity = ResponseEntity
                    .status(HttpStatus.NO_CONTENT)
                    .body("not client");

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
    public ResponseEntity<?> delete(@PathVariable(required = false) Long id) {
        if (id != null) {
            log.info("Delete id " + id);
            clientService.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not id");
    }

    @GetMapping(value = "/reportOdt")
    public HttpEntity<? extends Serializable> getReportOdt() {
        log.info("getReportOdt");
        ResponseEntity<byte[]> body;
        try {
            body = ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=report1.odt")
                    .header("filename", "report1.odt")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(clientService.getReportOdt().toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.GONE);
        }
        return body;
    }

    @GetMapping(value = "/reportXml2")
    public HttpEntity<? extends Serializable> getReportXml2() {
        log.info("getReportXml2");
        ResponseEntity<byte[]> body;
        try {
            body = ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=report1.xml")
                    .header("filename", "report1.xml")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(clientService.getReportXml2().toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.GONE);
        }
        return body;
    }

    @GetMapping(value = "/reportXml")
    public HttpEntity<? extends Serializable> getReportXml() {
        log.info("getReportXml");
        ResponseEntity<byte[]> body;
        try {
            body = ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=report1.xml")
                    .header("filename", "report1.xml")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(clientService.getReportXml().toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.GONE);
        }
        return body;
    }

    @GetMapping(value = "/reportTxt")
    public HttpEntity<? extends Serializable> getReportTxt() {
        log.info("getReportTxt");
        ResponseEntity<byte[]> body;
        try {
            body = ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=report1.txt")
                    .header("filename", "report1.txt")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(clientService.getReportTxt().toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.GONE);
        }
        return body;
    }


    @GetMapping(value = "/reportPdf")
    public HttpEntity<? extends Serializable> getReportPdf() {
        log.info("getReportPdf");
        ResponseEntity<byte[]> body;
        try {
            body = ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=report1.pdf")
                    .header("filename", "report1.pdf")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(clientService.getReportPdf().toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.GONE);
        }
        return body;
    }

    @GetMapping(value = "/reportDocx")
    public HttpEntity<? extends Serializable> getReportDocx() {
        log.info("getReportDocx");
        ResponseEntity<byte[]> body;
        try {
            body = ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=report1.docx")
                    .header("filename", "report1.docx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(clientService.getReportDocx().toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.GONE);
        }
        return body;
    }



}
