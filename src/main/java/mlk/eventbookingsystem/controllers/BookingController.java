package mlk.eventbookingsystem.controllers;

import lombok.RequiredArgsConstructor;
import mlk.eventbookingsystem.dto.BookingRequest;
import mlk.eventbookingsystem.entities.Booking;
import mlk.eventbookingsystem.services.BookingService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public List<Booking> bookAnEvent(@RequestBody BookingRequest request, Authentication authentication) {
        String email = authentication.getName();
        return bookService.bookEvent(request.getEventId(), request.getSelectedSeats(), email);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public void deleteAnEvent(@PathVariable Long id){
        bookService.deleteBooking(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public Booking updateBook(@PathVariable Long id,@RequestBody Booking book){
        return bookService.updateBook(id, book);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public Optional<Booking> getBooksById(@PathVariable Long id){
        return bookService.getBookingById(id);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Booking> getAllBooks(){
        return bookService.getAllBookings();
    }

}
