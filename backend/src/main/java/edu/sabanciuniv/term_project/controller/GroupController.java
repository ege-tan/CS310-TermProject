package edu.sabanciuniv.term_project.controller;

import edu.sabanciuniv.term_project.model.Group;
import edu.sabanciuniv.term_project.model.Message;
import edu.sabanciuniv.term_project.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class GroupController {
     @Autowired
     private GroupService groupService;

    @PostMapping("/groups/create")
    public ResponseEntity<String> createGroup (@RequestBody Group group){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        group.setCreationTime(LocalDateTime.now());
        boolean created =  groupService.createGroup(group,email);
        if (created) {
            return ResponseEntity.ok("Group '"+ group.getName()+"' created with id : "+ group.getId());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Group '"+ group.getName()+"' creation failed");
        }
    }

    @PostMapping("/groups/{id}/add-member")
    public ResponseEntity<String> addMember (@RequestParam("email") String newMember,@PathVariable("id") String id ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        boolean added = groupService.addMember(id,newMember,email);
        if (added) {
            return ResponseEntity.ok(newMember + " added to group "+id);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( newMember + " not added to group "+id);
        }
    }

    @PostMapping("/groups/{id}/send")
    public ResponseEntity<String> sendMessage (@RequestParam("message") String content,@PathVariable("id") String id ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Message message = new Message();
        message.setSenderEmail(email);
        message.setRecipientEmail(id);
        message.setContent(content);
        boolean isSent = groupService.sendMessage(message,id,email);
        if (isSent) {
            return ResponseEntity.ok("Message sent to group " + id);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(email + " is not member of group " + id);
        }
    }

    @GetMapping("/groups/{id}/messages")
    public ResponseEntity<String> getMessages (@PathVariable("id") String id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        String meessages =  groupService.getMessages(id,email);
        if (meessages != null) {
            return ResponseEntity.ok(meessages);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(email+"is not member of group "+id);
        }
    }
    @GetMapping("/groups/{id}/members")
    public ResponseEntity<String> getMembers (@PathVariable("id") String id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        String members =  groupService.getMembers(id,email);
        if (members != null) {
            return ResponseEntity.ok(members);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(email+"is not member of group "+id);
        }
    }

    @GetMapping("/groups")
    public ResponseEntity<List<Group>> getGroups() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        List<Group> groups = groupService.getUserGroups(email);
        return ResponseEntity.ok(groups);
    }

    @GetMapping("/groups/{id}")
    public ResponseEntity<Group> getGroupDetails(@PathVariable("id") String id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Group group = groupService.getGroupDetails(id,email);
        if (group != null) {
            return ResponseEntity.ok(group);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
