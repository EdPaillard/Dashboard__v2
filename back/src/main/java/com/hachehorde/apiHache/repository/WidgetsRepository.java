package com.hachehorde.apiHache.repository;

import java.util.List;

import com.hachehorde.apiHache.model.Widgets;

import org.springframework.data.repository.CrudRepository;

public interface WidgetsRepository extends CrudRepository<Widgets, Long>{
    List<Widgets> getByUserId(Long userId);
    void deleteByValue(String value);
    List<Widgets> findAllByValue(String value);
}
