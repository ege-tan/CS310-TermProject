package edu.sabanciuniv.term_project.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class Message {
    @Id
    private String id;
    private String senderEmail;
    private String recipientEmail;
    private String content;
}
