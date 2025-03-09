package edu.sabanciuniv.term_project.service;

import edu.sabanciuniv.term_project.model.Message;
import edu.sabanciuniv.term_project.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    public boolean sendMessage(Message message) {
        if (userService.areFriends(message.getSenderEmail(),message.getRecipientEmail())){
            messageRepository.save(message);
            return true;
        }
        return false;
    }

    public String getMessages(String loggedUser , String friendUser) {
        if (userService.areFriends(loggedUser,friendUser)){
            List<Message> allMessages = messageRepository.findAll();
            //List<String> filteredMessages = new ArrayList<>();
            String filteredMessages = "";
            for (Message message : allMessages) {
                if ((message.getSenderEmail().equals(loggedUser) && message.getRecipientEmail().equals(friendUser)) ||
                   (message.getSenderEmail().equals(friendUser) && message.getRecipientEmail().equals(loggedUser))) {
                    filteredMessages += message.getSenderEmail() +": "+message.getContent()+"\n";
                }
            }
            return filteredMessages;
        }
        return null;
    }
}
