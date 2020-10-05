package app.web.pavelk.storage1.util.report;

import app.web.pavelk.storage1.entities.Client;

import org.springframework.stereotype.Component;

import java.io.*;
import java.util.List;

@Component
public class ReportTxtComponent {
    public ByteArrayOutputStream getReportTxt(List<Client> client) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        String separator = " ";
        for (Client line : client) {
            byteArrayOutputStream.write((line.getId().toString() + separator + line.getPhone() + separator + line.getName() + separator + line.getTitle() + "\n").getBytes());
        }
        byteArrayOutputStream.flush();
        return byteArrayOutputStream;
    }
}
