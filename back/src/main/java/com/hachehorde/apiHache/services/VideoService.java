package com.hachehorde.apiHache.services;

import com.hachehorde.apiHache.model.Widgets;
import com.hachehorde.apiHache.repository.WidgetsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class VideoService {
    private final String key = "AIzaSyDNpcyII1P4k7-Dz80GNx-UcNrUh7-TmgY";

    @Autowired
    private WidgetsRepository widgetsRepository;

    public String videoByQuery(String query, Long userId) {
        String url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+query+"&maxResults=15&key=" + key;

        RestTemplate restTemplate = new RestTemplate();
        String queryVideo = restTemplate.getForObject(url, String.class);

        Widgets widgets = new Widgets(url, userId, query);
        widgetsRepository.save(widgets);

        return queryVideo;
    }
    public String TopTen(Long userId){
        String url = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=fr&key="+key;

        RestTemplate restTemplate = new RestTemplate();
        String TopTen = restTemplate.getForObject(url, String.class);

        Widgets widgets = new Widgets(url, userId, null);
        widgetsRepository.save(widgets);

        return TopTen;
    }
    public String FetchSubscribersOf(String name, Long userId){
            String url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=" + name + "&fields=items/statistics/subscriberCount&key=" + key;
    
            RestTemplate restTemplate = new RestTemplate();
            String subscribers = restTemplate.getForObject(url, String.class);

            Widgets widgets = new Widgets(url, userId, name);
            widgetsRepository.save(widgets);
    
            return subscribers;
    }
}