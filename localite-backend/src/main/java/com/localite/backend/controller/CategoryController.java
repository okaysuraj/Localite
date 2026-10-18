package com.localite.backend.controller;

import com.localite.backend.repository.EventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    private final EventRepository eventRepository;

    public CategoryController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public ResponseEntity<List<String>> getCategories() {
        Set<String> categories = new LinkedHashSet<>();
        
        // Seed standard premier categories
        categories.add("Tennis");
        categories.add("Pickleball");
        categories.add("Cricket");
        categories.add("Squash");
        categories.add("Golf");
        categories.add("Badminton");
        categories.add("Cultural Salon");
        categories.add("Polo");

        // Merge existing categories from database
        try {
            List<String> dbCategories = eventRepository.findDistinctCategories();
            if (dbCategories != null) {
                for (String c : dbCategories) {
                    if (c != null && !c.trim().isEmpty()) {
                        categories.add(c.trim());
                    }
                }
            }
        } catch (Exception ignored) {
        }

        return ResponseEntity.ok(new ArrayList<>(categories));
    }
}
