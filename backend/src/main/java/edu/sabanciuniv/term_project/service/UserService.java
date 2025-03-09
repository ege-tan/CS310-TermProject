package edu.sabanciuniv.term_project.service;
import edu.sabanciuniv.term_project.security.JwtUtil;
import edu.sabanciuniv.term_project.model.User;
import edu.sabanciuniv.term_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public User loadUserByEmail (String email) {
        return userRepository.findById(email).orElse(null);
    }
    public boolean exist(String email) {
        return userRepository.findById(email).isPresent();
    }
    public void registerUser(User user) {
        userRepository.save(user);
    }

    public boolean areFriends(String userEmail, String friendEmail) {
        User user = loadUserByEmail(userEmail);
        User friend = loadUserByEmail(friendEmail);

        if (user != null && friend != null) {
            return user.getFriendEmails().contains(friendEmail) && friend.getFriendEmails().contains(userEmail);
        }
        return false;
    }

    public String login(String email, String password) {
        if (userRepository.findById(email).isPresent()) {
            User user = loadUserByEmail(email);
            if (user != null && user.getPassword().equals(password)) {
                return jwtUtil.generateToken(email);
            }
        }
        return null;
    }

    public boolean sendFriendRequest(String loggedEmail, String receiverEmail) {
        User loggedUser = loadUserByEmail(loggedEmail);
        User receiverUser = loadUserByEmail(receiverEmail);
        if (loggedUser == null || receiverUser == null) {
            return false;
        } else if (loggedEmail.equals(receiverEmail)){
            return false;
        } else {
            List<String> receiver_request_inbox = receiverUser.getPendingFriendRequests();
            List<String> logged_friends_list = loggedUser.getFriendEmails();
            if (receiver_request_inbox.contains(loggedEmail) || logged_friends_list.contains(receiverEmail)) {
                return false;
            }
            else {
                receiver_request_inbox.add(loggedEmail);
                userRepository.save(receiverUser);
                return true;
            }
        }
    }

    public boolean acceptFriendRequest(String loggedEmail, String requestEmail) {
        User loggedUser = loadUserByEmail(loggedEmail);
        User requestedUser = loadUserByEmail(requestEmail);
        if (loggedUser == null || requestedUser == null) {
            return false;
        }
        else {
            List<String> logged_inbox_requests = loggedUser.getPendingFriendRequests();
            if (!logged_inbox_requests.contains(requestEmail)) {
                return false;
            }
            else {
                List<String> logged_friends_list = loggedUser.getFriendEmails();
                List<String> requested_friends_list = requestedUser.getFriendEmails();
                logged_inbox_requests.remove(requestEmail);
                logged_friends_list.add(requestEmail);
                requested_friends_list.add(loggedEmail);
                userRepository.save(requestedUser);
                userRepository.save(loggedUser);
                return true;
            }
        }
    }

    public List<String> getfriendList(String loggedEmail) {
        User loggedUser = loadUserByEmail(loggedEmail);
        if (loggedUser == null) {
            return null;
        }
        else {
            return loggedUser.getFriendEmails();
        }
    }

    public List<String> getpendingfriendList(String loggedEmail) {
        User loggedUser = loadUserByEmail(loggedEmail);
        if (loggedUser == null) {
            return null;
        }
        else {
            return loggedUser.getPendingFriendRequests();
        }
    }
}
