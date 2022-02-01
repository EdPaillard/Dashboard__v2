package com.hachehorde.apiHache.services;

import com.hachehorde.apiHache.model.Widgets;
import com.hachehorde.apiHache.repository.WidgetsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NewsService {
    private final String key = "f1ff1e11c75c44baad22aa5638d407a3";

    @Autowired
    private WidgetsRepository widgetsRepository;

    public String NewsPaper(String keyword, Long userId) {
        String url = "https://newsapi.org/v2/everything?q=" + keyword + "&apiKey=" + key;

        RestTemplate restTemplate = new RestTemplate();
        String newpaper = restTemplate.getForObject(url, String.class);

        Widgets widgets = new Widgets(url, userId, keyword);
        widgetsRepository.save(widgets);

        return newpaper;
    }

    public String TopNews(String category, Long userId){
        String url = "https://newsapi.org/v2/top-headlines?country=fr" + "&category=" + category+"&apiKey=" +key;

        RestTemplate restTemplate = new RestTemplate();
        String topnews = restTemplate.getForObject(url, String.class);

        Widgets widgets = new Widgets(url, userId, category);
        widgetsRepository.save(widgets);
        
        return topnews;
    }
}