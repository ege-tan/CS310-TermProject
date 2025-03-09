package edu.sabanciuniv.term_project.service;

import edu.sabanciuniv.term_project.model.Group;
import edu.sabanciuniv.term_project.model.Message;
import edu.sabanciuniv.term_project.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserService userService;

    public boolean createGroup(Group group,String email) {
        List<String> members = group.getMemberEmails();
        for (String i: members) {
            if (!userService.areFriends(email, i)) {
                return false;
            }
        }
        members.add(email);
        group.setMemberEmails(members);
        groupRepository.save(group);
        return true;
    }

    public boolean addMember(String groupId,String memberEmail,String creatorEmail) {
        Group group = groupRepository.findById(groupId).orElse(null);
        if (group == null)
            return false;
        List<String> members =  group.getMemberEmails();
        if (members.contains(memberEmail) ||
                !userService.exist(memberEmail) ||
                !userService.areFriends(creatorEmail, memberEmail) ||
                !group.getMemberEmails().contains(creatorEmail)) {
            return false;
        }
        members.add(memberEmail);
        group.setMemberEmails(members);
        groupRepository.save(group);
        return true;
    }

    public boolean sendMessage(Message message,String groupId,String senderEmail) {
        Group group =groupRepository.findById(groupId).orElse(null);
        if (group == null)
            return false;
        if (group.getMemberEmails().contains(senderEmail)) {
            List<Message> messages= group.getGroupMessages();
            messages.add(message);
            group.setGroupMessages(messages);
            groupRepository.save(group);
            return true;
        }
        return false;
    }

    public String getMessages(String groupId,String email) {
        Group group = groupRepository.findById(groupId).orElse(null);
        if (group == null)
            return null;
        if (group.getMemberEmails().contains(email)) {
            String Messages = "";
            for (Message m: group.getGroupMessages()) {
                Messages += m.getSenderEmail()+ ": "+m.getContent()+"\n";
            }
            return Messages;
        }
        return null;
    }

    public String getMembers(String groupId,String email) {
        Group group = groupRepository.findById(groupId).orElse(null);
        if (group == null)
            return null;
        if (group.getMemberEmails().contains(email)) {
            String Members = "";
            for (String m: group.getMemberEmails()) {
                Members += m+"\n";
            }
            return Members;
        }
        return null;
    }

    public List<Group> getUserGroups(String email) {
        List<Group> allGroups = groupRepository.findAll();
        List<Group> userGroups = new ArrayList<>();

        for (Group group : allGroups) {
            if (group.getMemberEmails().contains(email)) {
                userGroups.add(group);
            }
        }
        return userGroups;
    }

    public Group getGroupDetails(String groupId, String email) {
        Group group = groupRepository.findById(groupId).orElse(null);
        if (group == null) {
            return null;
        }
        if (group.getMemberEmails().contains(email)) {
            return group;
        }
        return null;
    }
}
