package mlk.eventbookingsystem.controllers;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import mlk.eventbookingsystem.dto.BookingRequest;
import mlk.eventbookingsystem.entities.Booking;
import mlk.eventbookingsystem.repos.BookingRepository;
import mlk.eventbookingsystem.services.BookingService;
import mlk.eventbookingsystem.services.EmailService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookService;
    private final EmailService emailService;
    private final BookingRepository bookingRepo;


    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public List<Booking> bookAnEvent(@RequestBody BookingRequest request, Authentication authentication) {
        String email = authentication.getName();
        List<Booking> bookings = bookService.bookEvent(request.getEventId(), request.getSelectedSeats(), email);

        // Send a single QR email with combined info (or one per booking if needed)
        StringBuilder qrData = new StringBuilder("Booking Confirmed!\n");
        for (Booking b : bookings) {
            qrData.append("Event: ").append(b.getEvents().getHalls())
                    .append("\nSeats: ").append(b.getSeatNumber())
                    .append("\nTime: ").append(b.getBookedAt()).append("\n\n");
        }

        try {
            emailService.sendQrCodeEmail(email, qrData.toString());
        } catch (MessagingException e) {

            System.err.println("Failed to send QR code email: " + e.getMessage());
        }


        return bookings;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public void deleteBooking(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        bookService.deleteBooking(id, email);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public Booking updateBook(@PathVariable Long id, @RequestBody Booking book, Authentication authentication) {
        String email = authentication.getName();
        return bookService.updateBook(id, book, email);
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

    @GetMapping("/history")
    @PreAuthorize("hasRole('USER')")
    public List<Booking> getUserBookings(Authentication authentication) {
        String email = authentication.getName();
        return bookService.getBookingsByUserEmail(email);
    }

    @GetMapping("/booked-seats/{eventId}")
    @PreAuthorize("hasRole('USER')")
    public List<String> getBookedSeats(@PathVariable Long eventId) {
        return bookingRepo.findByEventsId(eventId);
    }




}
