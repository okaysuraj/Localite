package com.localite.backend.seeder;

import com.localite.backend.model.Event;
import com.localite.backend.repository.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final EventRepository eventRepository;

    public DataSeeder(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (eventRepository.count() == 0) {
            Event event1 = new Event();
            event1.setTitle("Weekend 5v5 Basketball");
            event1.setCategory("Sports");
            event1.setDate(LocalDateTime.now().plusDays(2));
            event1.setLocation("Downtown Community Center");
            event1.setAttendees(8);
            event1.setMaxAttendees(10);
            event1.setImageUrl("https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop");
            event1.setLatitude(37.7749);
            event1.setLongitude(-122.4194);
            eventRepository.save(event1);

            Event event2 = new Event();
            event2.setTitle("Indie Board Games Night");
            event2.setCategory("Social");
            event2.setDate(LocalDateTime.now().plusDays(5));
            event2.setLocation("The Roasting Bean Cafe");
            event2.setAttendees(4);
            event2.setMaxAttendees(8);
            event2.setImageUrl("https://images.unsplash.com/photo-1610890716175-33100db28023?q=80&w=600&auto=format&fit=crop");
            event2.setLatitude(37.7849);
            event2.setLongitude(-122.4094);
            eventRepository.save(event2);

            Event event3 = new Event();
            event3.setTitle("Morning Riverside Run (5K)");
            event3.setCategory("Fitness");
            event3.setDate(LocalDateTime.now().plusDays(1));
            event3.setLocation("Riverfront Park Entrance");
            event3.setAttendees(12);
            event3.setMaxAttendees(20);
            event3.setImageUrl("https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600&auto=format&fit=crop");
            event3.setLatitude(37.7649);
            event3.setLongitude(-122.4294);
            eventRepository.save(event3);
            
            System.out.println("Mock data seeded into PostgreSQL database.");
        }
    }
}
