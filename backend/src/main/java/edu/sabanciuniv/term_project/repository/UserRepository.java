package edu.sabanciuniv.term_project.repository;
import edu.sabanciuniv.term_project.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}
