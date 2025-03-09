package edu.sabanciuniv.term_project.repository;
import edu.sabanciuniv.term_project.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {

}
