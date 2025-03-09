package edu.sabanciuniv.term_project.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class Group {
    @Id
    private String id;
    private String name;
    private List<String> memberEmails = new ArrayList<>();
    private List<Message> groupMessages = new ArrayList<>();
    private LocalDateTime creationTime;  // Add this field

}
