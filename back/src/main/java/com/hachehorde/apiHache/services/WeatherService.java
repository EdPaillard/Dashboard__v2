package com.hachehorde.apiHache.services;

import com.hachehorde.apiHache.model.Widgets;
import com.hachehorde.apiHache.repository.WidgetsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {
    private final String key = "8e0e12c87a2dce2da789a60f5029b5e9";

    @Autowired
    private WidgetsRepository widgetsRepository;

    public String Temperature(String city, Long userId) {
        String url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

        System.out.println(url);
        RestTemplate restTemplate = new RestTemplate();
        String weather = restTemplate.getForObject(url, String.class);

        Widgets widgets = new Widgets(url, userId, city);
        widgetsRepository.save(widgets);

        return weather;
    }
}