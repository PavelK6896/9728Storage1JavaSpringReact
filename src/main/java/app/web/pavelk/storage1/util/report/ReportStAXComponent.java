package app.web.pavelk.storage1.util.report;

import app.web.pavelk.storage1.entities.Client;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;

@Component
public class ReportStAXComponent {

    public ByteArrayOutputStream getReportXml(List<Client> client) throws XMLStreamException {
        XMLOutputFactory output = XMLOutputFactory.newInstance();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//            XMLStreamWriter writer = output.createXMLStreamWriter(new FileWriter("result.xml"));
        XMLStreamWriter writer = output.createXMLStreamWriter(byteArrayOutputStream);

        // Открываем XML-документ и Пишем корневой элемент BookCatalogue
        writer.writeStartDocument("1.0");
        writer.writeStartElement("Clients");
        // Делаем цикл для книг
        for (Client client2 : client) {
            // Записываем Book
            writer.writeStartElement("Client");
            writer.writeAttribute("id", client2.getId().toString());

            // Заполняем все тэги для книги
            // Phone
            writer.writeStartElement("Phone");
            writer.writeCharacters(client2.getPhone());
            writer.writeEndElement();

            // Name
            writer.writeStartElement("Name");
            writer.writeCharacters(client2.getName());
            writer.writeEndElement();

            // Title
            writer.writeStartElement("Title");
            writer.writeCharacters(client2.getTitle());
            writer.writeEndElement();

            // Date
            writer.writeStartElement("Date");
            writer.writeCharacters(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
            writer.writeEndElement();

            // Закрываем тэг Book
            writer.writeEndElement();
        }
        // Закрываем корневой элемент
        writer.writeEndElement();
        // Закрываем XML-документ
        writer.writeEndDocument();
        writer.flush();
        return byteArrayOutputStream;
    }


}
