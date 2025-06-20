package mlk.eventbookingsystem.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mlk.eventbookingsystem.entities.User;
import mlk.eventbookingsystem.repos.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User createUser(User user){
        return userRepo.save(user);
    }

    @Transactional
    public void deleteUser(Long id){
        userRepo.deleteById(id);
    }

    @Transactional
    public User updateUser(Long id, User updatedUser){
        return userRepo.findById( id).map( user ->{
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            user.setRole(updatedUser.getRole());

            return userRepo.save(user);
        }).orElseThrow(() -> new RuntimeException("user not found!."));
    }

    public Optional<User> getUserById(Long id){
        return userRepo.findById(id);
    }

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

}
