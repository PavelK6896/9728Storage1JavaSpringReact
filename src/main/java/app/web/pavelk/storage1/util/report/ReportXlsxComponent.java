package app.web.pavelk.storage1.util.report;

import app.web.pavelk.storage1.entities.Client;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import static org.apache.poi.ss.usermodel.HorizontalAlignment.CENTER;

@Component
public class ReportXlsxComponent {


    public ByteArrayOutputStream getReportXlsx(List<Client> client) throws IOException {

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Workbook workbook = new XSSFWorkbook(); //HSSFWorkbook

        //list1
        Sheet sheetOne = workbook.createSheet("list1");
        Row rowHeader = sheetOne.createRow(0);

        CellStyle cs = workbook.createCellStyle();
        cs.setBorderTop(BorderStyle.MEDIUM);
        cs.setBorderBottom(BorderStyle.MEDIUM);
        cs.setBorderLeft(BorderStyle.MEDIUM);
        cs.setBorderRight(BorderStyle.MEDIUM);
        cs.setAlignment(CENTER);
        cs.setVerticalAlignment(VerticalAlignment.CENTER);
        Font font = workbook.createFont();
        font.setFontHeightInPoints((short) 11);
        font.setFontName("Times New Roman");
        font.setBold(true);
        cs.setFont(font);

        CellStyle cs2 = workbook.createCellStyle();
        cs2.setBorderTop(BorderStyle.THIN);
        cs2.setBorderBottom(BorderStyle.THIN);
        cs2.setBorderLeft(BorderStyle.THIN);
        cs2.setBorderRight(BorderStyle.THIN);
        cs2.setAlignment(CENTER);
        cs2.setVerticalAlignment(VerticalAlignment.CENTER);
        Font font2 = workbook.createFont();
        font2.setFontHeightInPoints((short) 11);
        font2.setFontName("Times New Roman");
        cs2.setFont(font2);

        rowHeader.createCell(0).setCellValue("id");
        rowHeader.createCell(1).setCellValue("phone");
        rowHeader.createCell(2).setCellValue("name");
        rowHeader.createCell(3).setCellValue("title");

        for (int i = 0; i < 4; i++) {
            rowHeader.getCell(i).setCellStyle(cs);
        }

        int rowSetTableList = 1;

        for (Client client2 : client) {
            Row row = sheetOne.createRow(rowSetTableList);
            row.createCell(0).setCellValue(client2.getId());
            row.createCell(1).setCellValue(client2.getPhone());
            row.createCell(2).setCellValue(client2.getName());
            row.createCell(3).setCellValue(client2.getTitle());
            for (int i = 0; i < 4; i++) {
                row.getCell(i).setCellStyle(cs2);
            }
            rowSetTableList++;
        }

        for (int i = 0; i < 4; i++) {
            sheetOne.autoSizeColumn(i);
        }

        workbook.write(byteArrayOutputStream);
        workbook.close();
        return byteArrayOutputStream;
    }

    public void getReportXlsxSetList(Workbook workbook, List<Client> client) {

//        workbook.setForceFormulaRecalculation(true);//расщет формул
//        workbook.getCreationHelper().createFormulaEvaluator().evaluateAll();

        //list2------------------------------------
        Sheet sheet = workbook.createSheet("list2");
        // Нумерация начинается с нуля
        Row row = sheet.createRow(0);

        // Мы запишем имя и дату в два столбца
        // имя будет String, а дата рождения --- Date,
        // формата dd.mm.yyyy
        Cell name = row.createCell(0);
        name.setCellValue("John");

        Cell list2 = row.createCell(1);

        DataFormat format = workbook.createDataFormat();
        CellStyle dateStyle = workbook.createCellStyle();
        dateStyle.setDataFormat(format.getFormat("dd.mm.yyyy"));
        list2.setCellStyle(dateStyle);

        // Нумерация лет начинается с 1900-го
        list2.setCellValue(new Date(110, 10, 10));

        // Меняем размер столбца
        sheet.autoSizeColumn(1);


        //list3----------------------------
        Sheet sheetThree = workbook.createSheet("list3");
        int rowNum = 1;
        CellStyle cellStyle3 = workbook.createCellStyle();
        cellStyle3.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0.00"));//нули после запятой
        for (Client client3 : client) {
            Row rowNew = sheetThree.createRow(rowNum);
            rowNew.createCell(0).setCellValue(client3.getId());
            rowNew.createCell(1).setCellValue(Long.parseLong(client3.getPhone()));
            rowNew.createCell(2).setCellValue(rowNum);
            rowNew.createCell(3).setCellValue(rowNum);
            rowNew.createCell(4).setCellValue(rowNum);
            rowNew.createCell(5).setCellValue(rowNum);

            for (int i = 0; i < 6; i++) {
                rowNew.getCell(i).setCellStyle(cellStyle3);
            }


            rowNum++;
        }

        //formula
        Row row1 = sheetThree.createRow(rowNum);

        Cell cell0 = row1.createCell(0);
        Cell cell1 = row1.createCell(1);
        Cell cell2 = row1.createCell(2);
        Cell cell3 = row1.createCell(3);
        Cell cell4 = row1.createCell(4);
        Cell cell5 = row1.createCell(5);
        for (int i = 0; i < 6; i++) {
            row1.getCell(i).setCellStyle(cellStyle3);
        }

        String cellColumn0 = CellReference.convertNumToColString(0);
        String cellColumn1 = CellReference.convertNumToColString(1);
        String cellColumn2 = CellReference.convertNumToColString(2);
        String cellColumn3 = CellReference.convertNumToColString(3);
        String formula0 = String.format("SUM(%s%d:%s%d)", cellColumn0, 2, cellColumn0, rowNum);
        String formula1 = String.format("SUM(%s%d:%s%d)", cellColumn1, 2, cellColumn1, rowNum);
        //IMSUB	МНИМ.РАЗН	Возвращает разность двух комплексных чисел.
        String formula2 = String.format("(%s%d - %s%d)", cellColumn2, 2, cellColumn2, rowNum);
        cell0.setCellFormula(formula0);
        cell1.setCellFormula(formula1);
        cell2.setCellFormula(formula2);

        //        MOD	ОСТАТ	Возвращает остаток от деления.
        //        =I11 * 100/C11 =A2/A3 = A2/$C $2
        //        =ПРОИЗВЕД(B2:B7;L13:M16;F12:J20) PRODUCT
        String formula3 = String.format("PRODUCT(%s%d:%s%d)", cellColumn3, 2, cellColumn3, rowNum);
        String formula4 = String.format("PRODUCT(%s%d:%s%d)", cellColumn3, 2, cellColumn3, rowNum);
        String formula5 = String.format("(%s%d / %s%d)", cellColumn3, 2, cellColumn3, rowNum);
        cell3.setCellFormula(formula3);
        cell4.setCellFormula(formula4);
        cell5.setCellFormula(formula5);

        //size
        sheetThree.autoSizeColumn(1);
        sheetThree.autoSizeColumn(2, true);
        sheetThree.autoSizeColumn(3, true);
        sheetThree.getRow(1).setHeight((short) 1500);
        sheetThree.getRow(2).setHeight((short) 1000);
        sheetThree.getRow(3).setHeight((short) 500);
        sheetThree.setColumnWidth(0, 2000);
        sheetThree.setColumnWidth(2, 5000);
        sheetThree.setColumnWidth(3, 8000);
    }
}
