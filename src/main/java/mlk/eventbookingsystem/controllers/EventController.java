package mlk.eventbookingsystem.controllers;

import lombok.RequiredArgsConstructor;
import mlk.eventbookingsystem.entities.Event;
import mlk.eventbookingsystem.services.EventService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Event createEvent(@RequestBody Event events){
        return eventService.createEvent(events);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteEvent(@PathVariable Long id){
        eventService.deleteEvent(id);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Event updateEvent(@PathVariable Long id,@RequestBody Event events){
        return eventService.updateEvent(id, events);
    }


    @GetMapping
    public Optional<Event> getEventById(Long id){
        return eventService.getEventById(id);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Event> getAllEvents(){
        return eventService.getAllEvents();
    }
}
