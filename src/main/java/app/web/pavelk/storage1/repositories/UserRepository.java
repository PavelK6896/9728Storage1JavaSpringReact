package app.web.pavelk.storage1.repositories;


import app.web.pavelk.storage1.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    <T> T findByUsername(String phone, Class<T> type);

    Optional<User> findByUsername(String username);

}
