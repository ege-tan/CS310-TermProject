package edu.sabanciuniv.term_project.repository;
import edu.sabanciuniv.term_project.model.Group;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GroupRepository extends MongoRepository<Group, String> {

}
