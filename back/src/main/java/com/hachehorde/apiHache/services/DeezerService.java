package com.hachehorde.apiHache.services;

import com.hachehorde.apiHache.model.Widgets;
import com.hachehorde.apiHache.repository.WidgetsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

// spotify demande une gestion des tokens, à voir si ca peut passer? 
@Service
public class DeezerService {

    @Autowired
    private WidgetsRepository widgetsRepository;

    public String Song(String artist, Long userId) {
        String link = "https://api.deezer.com/search?q=" + artist;

        RestTemplate restTemplate = new RestTemplate();
        String songs = restTemplate.getForObject(link, String.class);

        Widgets widgets = new Widgets(link, userId, artist);
        widgetsRepository.save(widgets);

        return songs;
    }
}