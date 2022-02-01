package com.hachehorde.apiHache.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.hachehorde.apiHache.model.Widgets;
import com.hachehorde.apiHache.services.DeezerService;
import com.hachehorde.apiHache.services.NewsService;
import com.hachehorde.apiHache.services.UserService;
import com.hachehorde.apiHache.services.VideoService;
import com.hachehorde.apiHache.services.WeatherService;
import com.hachehorde.apiHache.services.WidgetsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class RestApiController {
    
    private Long userId = 0L;
    private boolean isLogged = true;

    @Autowired
    WeatherService weather;
    @Autowired
    DeezerService deezer;
    @Autowired
    NewsService news;
    @Autowired
    VideoService yt;
    @Autowired
    UserService userService;
    @Autowired
    WidgetsService widgetsService;

    @PostMapping("/login")
    public void postLogin(@RequestParam String email, @RequestParam String password, HttpServletResponse response) throws IOException {
        System.out.println("TESLA?");
        this.userId = userService.login(email, password);
        if(userId != 0L) {
            System.out.println("Test");
            isLogged = true;
            response.sendRedirect("http://localhost:3000/Dashboard");
        } else {
            response.sendRedirect("http://localhost:3000/Login");
        }
    }

    @PostMapping("/register")
    public void postRegister(@RequestParam String email, @RequestParam String password, HttpServletResponse response) throws Exception {
        try {
            userService.saveRegister(email, password);
            response.sendRedirect("http://localhost:3000/Login");
        }
        catch(Exception e) {
            response.sendRedirect("http://localhost:3000");

        }
        
    }

    @GetMapping("/widgets")
    @ResponseBody
    public Iterable<Widgets> getUserWidgets() {
        Iterable<Widgets> widgets = widgetsService.getWidgets(userId);
        System.out.println(widgets);
        return widgets;
    }

    @PostMapping("/delWidgets")
    public void deleteWidget(@RequestBody String value) {
        Long userId = this.userId;
        String newValue = value.replaceAll("\"", "");
        Iterable<Widgets> listWidgets = widgetsService.getWidgets(userId);
        for(Widgets elmt: listWidgets) {
            System.out.println(elmt.getValue());
            System.out.println(newValue);
            if(elmt.getValue().equals(newValue)) {
                System.out.println("Es TU ICI PETIT SCARABE ?");
                widgetsService.delete(elmt);
            }
        }        
    }
    
    @RequestMapping(value = "/services/weather/temp", method= RequestMethod.GET)
    public String temp(@RequestParam("value") String val) {

            String sys = weather.Temperature(val, userId);
            return sys;
        
    }

    @RequestMapping(value = "/services/music/artist")
    public String artiste(@RequestParam("value") String val) {
        if(isLogged) {
            return deezer.Song(val, userId);
        }
        return null;
    }

    @RequestMapping(value="/services/news/keyword")
    public String keyword(@RequestParam("value")String val){
        if(isLogged) {
            return news.NewsPaper(val, userId);
        }
        return null;
    }

    @RequestMapping(value = "/services/news/topnews")
    public String topnews(@RequestParam("value") String val){
        if(isLogged) {
            return news.TopNews(val, userId);
        }
        return null;
    }

    @RequestMapping(value = "/services/yt/trendingtop")
    public String topTrending(@RequestParam("value")String val){
        if(isLogged) {
            return yt.TopTen(userId);
        }
        return null;
    }

    @RequestMapping(value = "/services/yt/search")
    public String search(@RequestParam("value") String val){
        if(isLogged) {
            return yt.videoByQuery(val, userId);
        }
        return null;
    }

    @RequestMapping(value = "/services/yt/subscribers")
    public String subscribers(@RequestParam("value") String val){
        if(isLogged) {
            return yt.FetchSubscribersOf(val, userId);
        }
        return null;
    }

}
