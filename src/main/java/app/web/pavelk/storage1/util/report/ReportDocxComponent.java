package app.web.pavelk.storage1.util.report;

import app.web.pavelk.storage1.entities.Client;
import com.documents4j.api.DocumentType;
import com.documents4j.job.LocalConverter;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Component
public class ReportDocxComponent {

    private ReportComponent reportComponent;

    @Autowired
    public void setReportComponent(ReportComponent reportComponent) {
        this.reportComponent = reportComponent;
    }


    public ByteArrayOutputStream getReportDocx(List<Client> client) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        XWPFDocument xwpfDocument = new XWPFDocument();
        XWPFParagraph xwpfParagraph = xwpfDocument.createParagraph();
        XWPFRun xwpfRun = xwpfParagraph.createRun();
        xwpfRun.setText("Отчет");

        XWPFTable xwpfTable = xwpfDocument.createTable();

        XWPFTableRow xwpfTableRowOne = xwpfTable.getRow(0);
        xwpfTableRowOne.getCell(0).setText("id");
        xwpfTableRowOne.addNewTableCell().setText("phone");
        xwpfTableRowOne.addNewTableCell().setText("name");
        xwpfTableRowOne.addNewTableCell().setText("title");

        for (Client row : client) {
            XWPFTableRow xwpfTableRow = xwpfTable.createRow();
            xwpfTableRow.getCell(0).setText(row.getId().toString());
            xwpfTableRow.getCell(1).setText(row.getPhone());
            xwpfTableRow.getCell(2).setText(row.getName());
            xwpfTableRow.getCell(3).setText(row.getTitle());
        }
        xwpfDocument.write(byteArrayOutputStream);
        return byteArrayOutputStream;
    }

    //documents4j convert не работает на линукс
    public ByteArrayOutputStream getReportDocx2(List<Client> client) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(reportComponent.getReportOdt(client).toByteArray());
        com.documents4j.api.IConverter converter = LocalConverter.builder().build();
        converter.convert(byteArrayInputStream).as(DocumentType.DOC).to(byteArrayOutputStream).as(DocumentType.DOCX).execute();
        return byteArrayOutputStream;
    }
}
