package edu.sabanciuniv.term_project.controller;

import edu.sabanciuniv.term_project.model.Message;
import edu.sabanciuniv.term_project.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/messages/send")
    public ResponseEntity<String> sendMessage(@RequestParam("to") String recipientEmail, @RequestParam("message") String content) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Message message = new Message();
        message.setSenderEmail(email);
        message.setRecipientEmail(recipientEmail);
        message.setContent(content);
        boolean isSent = messageService.sendMessage(message);
        if (isSent) {
            return ResponseEntity.ok("Message sent to " + recipientEmail);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to send message");
        }
    }

    @GetMapping("/messages")
    public ResponseEntity<String> getMessages(@RequestParam("with") String friendEmail) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        String messages = messageService.getMessages(email,friendEmail);
        if (messages != null) {
            return ResponseEntity.ok(messages);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to get messages");
        }
    }

}
