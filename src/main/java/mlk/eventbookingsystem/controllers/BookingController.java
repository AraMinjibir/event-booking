package mlk.eventbookingsystem.controllers;

import lombok.RequiredArgsConstructor;
import mlk.eventbookingsystem.entities.Booking;
import mlk.eventbookingsystem.services.BookingService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookService;

    @PostMapping
    public Booking bookAnEvent(@RequestBody Booking book){
        return bookService.createBooking(book);
    }

    @DeleteMapping("/{id}")
    public void deleteAnEvent(@PathVariable Long id){
        bookService.deleteBooking(id);
    }

    @PutMapping("/{id}")
    public Booking updateBook(@PathVariable Long id,@RequestBody Booking book){
        return bookService.updateBook(id, book);
    }

    @GetMapping("/{id}")
    public Optional<Booking> getBooksById(@PathVariable Long id){
        return bookService.getBookingById(id);
    }

    @GetMapping("/getBooks")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Booking> getAllBooks(){
        return bookService.getAllBookings();
    }

}
