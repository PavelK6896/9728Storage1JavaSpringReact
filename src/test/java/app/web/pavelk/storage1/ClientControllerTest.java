package app.web.pavelk.storage1;


import org.junit.jupiter.api.Test;
import org.odftoolkit.simple.TextDocument;
import org.odftoolkit.simple.table.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.io.ByteArrayInputStream;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest(classes = {app.web.pavelk.storage1.Application.class})
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
public class ClientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "122", roles = "ADMIN")
    @Sql(value = {"/create-clients.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    public void saveSubscriptionList() throws Exception {

        MvcResult result = mockMvc.perform(get("http://localhost:8080/api/v1/client/reportOdt"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_OCTET_STREAM))
                .andExpect(header().string("Content-Disposition",
                        "attachment;filename=report1.odt"))
                .andReturn();

        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(result.getResponse().getContentAsByteArray());
        TextDocument textDocument = (TextDocument) TextDocument.loadDocument(byteArrayInputStream);

        List<Table> tableList = textDocument.getTableList();
        System.out.println("size --- " + tableList.size());
        tableList.forEach(table -> {
            System.out.println(table.getCellByPosition(1, 1).getStringValue());//7920887
            System.out.println(table.getCellByPosition(2, 2).getStringValue());//Valentin
        });
//        textDocument.save("odtTest.odt");
    }
}
