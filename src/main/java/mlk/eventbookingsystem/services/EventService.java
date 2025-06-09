package mlk.eventbookingsystem.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mlk.eventbookingsystem.entities.Event;
import mlk.eventbookingsystem.repos.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {
    public final EventRepository eventRepo;

    @Transactional
    public Event createEvent(Event event){
        return eventRepo.save(event);
    }

    @Transactional
    public void deleteEvent(Long id){
        eventRepo.deleteById(id);
    }

    @Transactional
    public Event updateEvent(Long id, Event updatedEvent){
        return eventRepo.findById(id).map(event ->{
            event.setHalls(updatedEvent.getHalls());
            event.setAvailableSeat(updatedEvent.getAvailableSeat());
            event.setDescription(updatedEvent.getDescription());
            event.setDateTime(updatedEvent.getDateTime());
            event.setLocation(updatedEvent.getLocation());
            event.setImageUrl(updatedEvent.getImageUrl());

            return eventRepo.save(event);
        }).orElseThrow(() -> new RuntimeException("Event not found!"));
    }

    public Optional<Event> getEventById(Long id){
        return eventRepo.findById(id);
    }

    public List<Event> getAllEvents(){
        return eventRepo.findAll();
    }
}
