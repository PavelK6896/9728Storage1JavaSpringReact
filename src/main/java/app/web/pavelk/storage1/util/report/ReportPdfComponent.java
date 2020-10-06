package app.web.pavelk.storage1.util.report;

import app.web.pavelk.storage1.entities.Client;
import com.documents4j.api.DocumentType;
import com.documents4j.job.LocalConverter;
import com.itextpdf.text.Document;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import fr.opensagres.xdocreport.converter.ConverterRegistry;
import fr.opensagres.xdocreport.converter.ConverterTypeTo;
import fr.opensagres.xdocreport.converter.IConverter;
import fr.opensagres.xdocreport.converter.Options;
import fr.opensagres.xdocreport.core.document.DocumentKind;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;


@Component
public class ReportPdfComponent {

    private ReportComponent reportComponent;

    @Autowired
    public void setReportComponent(ReportComponent reportComponent) {
        this.reportComponent = reportComponent;
    }

    public ByteArrayOutputStream getReportPdf(List<Client> client) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, byteArrayOutputStream);
        document.open();
        PdfPTable pdfPTable = new PdfPTable(4);
        PdfPCell pdfPCell = new PdfPCell();
        pdfPCell.setPhrase(new Phrase("id"));
        pdfPTable.addCell(pdfPCell);
        pdfPCell.setPhrase(new Phrase("phone"));
        pdfPTable.addCell(pdfPCell);
        pdfPCell.setPhrase(new Phrase("name"));
        pdfPTable.addCell(pdfPCell);
        pdfPCell.setPhrase(new Phrase("title"));
        pdfPTable.addCell(pdfPCell);
        for (Client row : client) {
            pdfPTable.addCell(row.getId().toString());
            pdfPTable.addCell(row.getPhone());
            pdfPTable.addCell(row.getName());
            pdfPTable.addCell(row.getTitle());
        }
        document.add(pdfPTable);
        document.close();
        return byteArrayOutputStream;
    }

    //documents4j convert не работает на линукс
    public ByteArrayOutputStream getReportPdf2(List<Client> client) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(reportComponent.getReportOdt(client).toByteArray());
        com.documents4j.api.IConverter converter = LocalConverter.builder().build();
        converter.convert(byteArrayInputStream).as(DocumentType.DOC).to(byteArrayOutputStream).as(DocumentType.PDF).execute();
        return byteArrayOutputStream;
    }

    //XDocReport не работает это преобразование
    public ByteArrayOutputStream getReportPdf3(List<Client> client) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(reportComponent.getReportOdt(client).toByteArray());
        Options options = Options.getFrom(DocumentKind.ODT).to(ConverterTypeTo.PDF);
        IConverter converter = ConverterRegistry.getRegistry().getConverter(options);
        converter.convert(byteArrayInputStream, byteArrayOutputStream, options);
        return byteArrayOutputStream;
    }
}
