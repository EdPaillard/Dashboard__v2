package com.hachehorde.apiHache.services;

import java.util.List;

import com.hachehorde.apiHache.model.Widgets;
import com.hachehorde.apiHache.repository.WidgetsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WidgetsService {
    @Autowired
    WidgetsRepository widgetsRepository;

    public Iterable<Widgets> getWidgets(Long userId) {

        return widgetsRepository.getByUserId(userId);
    }

    public List<Widgets> getByValue(String value) {
       List<Widgets> widget = widgetsRepository.findAllByValue(value);
       System.out.println("AS TU LE WIDGET: " + widget);
       return widget;
    }

    public void delete(Widgets widget) {
        widgetsRepository.delete(widget);
    }

    public void deleteByValue(String value) {
        System.out.println("Blop ?");
        widgetsRepository.deleteByValue(value);
    }
    
}
