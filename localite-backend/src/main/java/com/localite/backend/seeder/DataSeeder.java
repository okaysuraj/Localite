package com.localite.backend.seeder;

import com.localite.backend.model.Event;
import com.localite.backend.model.User;
import com.localite.backend.repository.EventRepository;
import com.localite.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public DataSeeder(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User user1 = new User("Julian Vance", "julian@localite.com", "mock_uid_1");
            user1.setBio("Principal Architect");
            user1.setNeighborhood("0.8 MILES");
            user1.setInterests("Modernism, Sailing, Vinyl");
            user1.setProfilePhotoUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuDaE8RD8w1ffPWyQeSoMWwHK764oE4YdkXo1wsal0FWmryzptNtZuTUQZ_WG4vVk6-3SknVVuBQQvrOFs35aEj56FnXsLMvl_Y1ThUozU5X4XpHekiBAHgO7-uqMUbBSDn0zrn3rPEWspugY1kjVPBPOYRtq7GuT4M2eBPQabxMuSKI2lW-Wg-yWe4GKIxOP-UhNdjwdxa22D6LS3HsEJG7vTICUqns7RgDOUSI8qmEEXKxpVetBykHLg");
            userRepository.save(user1);

            User user2 = new User("Elena Rossi", "elena@localite.com", "mock_uid_2");
            user2.setBio("Sommelier");
            user2.setNeighborhood("1.2 MILES");
            user2.setInterests("Tuscany, Jazz, Fine Dining");
            user2.setProfilePhotoUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuAwf_DpQZd7hJpQjkLmC17R7kP78opcwjlYJqbrEJEAmwpBZVBfykVwXqoeheuTmfmqR92MOexwnY5mVGoIPZE5wscuKRGIAIzhXzEGVQDtvtHklhA8PCGHapJuVDGooMEwHBuImbgBdFOx1qIRTg-9_CYXfttZ803i7VhQbVLr0lTVXi9QLNWUscTJpQQsO-AnQZadp1PYiz_gSmNyRtr0gs2eDAVfMSGRDENKrc3-YqCBa17MF-mJ0Q");
            userRepository.save(user2);

            User user3 = new User("Marcus Thorne", "marcus@localite.com", "mock_uid_3");
            user3.setBio("Venture Partner");
            user3.setNeighborhood("2.5 MILES");
            user3.setInterests("Tennis, Startups, Philanthropy");
            user3.setProfilePhotoUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuBUMM8EiC3FbNtxU98MZlDHfjuhu4nHyGJgyDjtMOBvUE9yEqNT9W5t5LIbRbT9br9rW8azRIRg7KWQROHRs4VTlJ1k0_yniBjI26BDmRIIqwFDif8PSMlUFoBfbCa_QRSl1VJoAAY1B_n903TKJZ_ERnPLDIce-rgHRtyrqK7TuEobvzkUOaSYUc6L_xTiUvGYPNHWwEb6aMYIvvNUvsD8Ql28BtkNbCZ0vfmbr5hKvbA1WTy6zNhHkw");
            userRepository.save(user3);

            User user4 = new User("Sophia Chen", "sophia@localite.com", "mock_uid_4");
            user4.setBio("Creative Director");
            user4.setNeighborhood("0.5 MILES");
            user4.setInterests("Branding, Sculpture, Travel");
            user4.setProfilePhotoUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuC8aVfn1ZJ81sBFMq6ZFkfDGSZmdYJBgUkzJibXQMHoqNfJ3xICmURceNOqk-4RovrGezRd7cM2Z3Zw1j6nFJm7Hzm87wu65Rc94Ar7gASmanFa1gSbi6Tao_QbAYt069GWpkzEI4CHhQCR7E4yuogQ_vu1MtUlZA9QN482gbIRT0H3qOXd5zuh5-PqrMjOdYiTFtNcUeoFDA0m7J8RWdPnfbuNHHX6VcSktLP2aVsxijAHVIDXu8agkA");
            userRepository.save(user4);
        }

        if (eventRepository.count() == 0) {
            Event event1 = new Event();
            event1.setTitle("The Midsummer Garden Soiree at Elmsley Manor");
            event1.setEventType("PREMIUM EXHIBITION");
            event1.setDescription("An evening of curated gastronomy, live jazz, and high-society networking in the private gardens of the historic Elmsley estate.");
            event1.setDate(LocalDateTime.now().plusDays(24));
            event1.setLocation("Elmsley Manor");
            event1.setCategory("CULTURE & ARTS");
            event1.setAttendees(120);
            event1.setMaxAttendees(150);
            event1.setImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuC5_ntHtCf-2oV-osFHjF37uhHYTmaDHdxRwH-9gXR_tnVW8uBhRcTJnVOLP3drjqsihPPyVeGeNJXZut2oPxreWDu4_OA0I9nzTBh0EKvfCymtO7LEnXRGlDTIFw1IfR_cSNHrId3ySpf8OwRmfaoDZbdvrn30_ZOOWbyqqRRMb36jTp7XnYO1QjfwnIl5xIXjxoyeK7hnbKQ9BBT6Ylk6qGNfFax_X3SEG76-081XlWHniOHx0zo3WQ");
            event1.setLatitude(40.7128);
            event1.setLongitude(-74.0060);
            eventRepository.save(event1);

            Event event2 = new Event();
            event2.setTitle("Midnight Philharmonic: Vivaldi Reimagined");
            event2.setEventType("LIVE");
            event2.setDescription("Experience the fusion of classic renaissance aesthetics with cutting-edge generative technology.");
            event2.setDate(LocalDateTime.now().plusDays(10));
            event2.setLocation("The Grand Opera");
            event2.setCategory("CULTURE & ARTS");
            event2.setAttendees(45);
            event2.setMaxAttendees(50);
            event2.setImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuC8GCyVMZYRsFHTMohkKcArN52qT45xyUXS8_V9gnu_bY_xzC--I23-QfKP1wDMABmiuuH3gHev0zxl0teny56PvTteQ4kMH1HUWnIMmfJN-2iAk2Z87PHlz8eFoJ-CzxwykUf1DIep7-7TkQjQ4lbnzQ7L04UAMOTjEkf7htJVJYVJkI1nLRBfiD-littH3fCv_7jAV8mz5yFleGffwU_zJYiZ8uNYpcg6856t1qQ8zKTsOhut8ttdHg");
            event2.setLatitude(40.7138);
            event2.setLongitude(-74.0160);
            eventRepository.save(event2);

            Event event3 = new Event();
            event3.setTitle("Charity Tennis Invitational & Brunch");
            event3.setEventType("SPORTS");
            event3.setDescription("A private doubles tournament held at the historic Belvedere Courts.");
            event3.setDate(LocalDateTime.now().plusDays(12));
            event3.setLocation("Royal Oaks Club");
            event3.setCategory("SPORTS & CHARITY");
            event3.setAttendees(24);
            event3.setMaxAttendees(30);
            event3.setImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuD9TG1JfcrKTW23Q65T5QM_dGf-GjwxmkALkR1HmU4u5tXouDjG8zcsA1Aj4ROET2E0Rpfd9Ub80m4zQnwReEch3lOfN22TwKftbD3t4uXATpNU96O48Ig-t1gX1vwPslMNoNnmosetKmTN5MwOflNiolYikncYQwbSsf4c-FxdjZmCb0cmj_h5Fhfce10bi1VSpGlYCihHDkpLelNUjaV4QGTD33pnoWBpIR8yNJVeVObXV0TZ8jQueg");
            event3.setLatitude(40.7028);
            event3.setLongitude(-74.0120);
            eventRepository.save(event3);
            
            System.out.println("Modern Nobility mock data seeded into PostgreSQL database.");
        }
    }
}
