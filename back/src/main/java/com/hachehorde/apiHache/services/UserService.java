package com.hachehorde.apiHache.services;

import com.hachehorde.apiHache.model.User;
import com.hachehorde.apiHache.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public Long login(String email, String password) {
        Long userId = 0L;
        User user = userRepository.findByEmail(email);
        System.out.println("REPOISSUE?");
        if(user != null) {
            System.out.println("USER NON NULL");
            if(user.getPassword().equals(password)) {
                System.out.println("checkPass");
                userId = user.getId();
                System.out.println(userId);
                return userId;
            }
        }
        System.out.println("PRERETURN");
        return userId; 
    }

    public boolean saveRegister(String email, String password) {
        if(email != "" || password != "" ) {
            User user = new User(email, password);
            userRepository.save(user);
                
            return true;
        }
        return false;
    }
     
    
}
