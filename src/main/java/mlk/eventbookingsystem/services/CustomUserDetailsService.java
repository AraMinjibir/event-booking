package mlk.eventbookingsystem.services;

import mlk.eventbookingsystem.entities.User;
import mlk.eventbookingsystem.repos.UserRepository;
import mlk.eventbookingsystem.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        System.out.println("User loaded: " + user.getEmail());
        System.out.println("Loaded user: " + user.getEmail() + " Password: " + user.getPassword());
        return new CustomUserDetails(user);
    }

}
