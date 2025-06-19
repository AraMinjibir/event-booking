package mlk.eventbookingsystem.services;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mlk.eventbookingsystem.entities.Booking;
import mlk.eventbookingsystem.entities.Event;
import mlk.eventbookingsystem.entities.User;
import mlk.eventbookingsystem.repos.BookingRepository;
import mlk.eventbookingsystem.repos.EventRepository;
import mlk.eventbookingsystem.repos.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepo;
    private final UserRepository userRepo;
    private final EventRepository eventRepo;
    private final EmailService emailService;

    @Transactional
    public List<Booking> bookEvent(Long eventId, List<String> selectedSeats, String userEmail) {
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));
        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + eventId));

        List<Booking> bookings = new ArrayList<>();

        StringBuilder qrData = new StringBuilder();
        qrData.append("🎫 *Event Booking Confirmation* \n")
                .append("🗓 Event: ").append(event.getHalls()).append("\n")
                .append("📍 Location: ").append(event.getLocation()).append("\n\n");

        for (String seat : selectedSeats) {
            // ✅ PREVENT DOUBLE BOOKING
            if (bookingRepo.existsByEventsIdAndSeatCode(eventId, seat)) {
                throw new RuntimeException("Seat " + seat + " is already booked!");
            }
            Booking booking = new Booking();
            booking.setUsers(user);
            booking.setEvents(event);
            booking.setBookedAt(LocalDate.now());

            booking.setSeatCode(seat);

            String numberOnly = seat.replaceAll("[^0-9]", "");
            booking.setSeatNumber(Integer.parseInt(numberOnly));

            String qrCode = UUID.randomUUID().toString();
            booking.setQrCode(qrCode);

            bookings.add(bookingRepo.save(booking));

            qrData.append("🪑 Seat: ").append(seat)
                    .append(" | QR: ").append(qrCode).append("\n");
        }


        // Send the email
        try {
            emailService.sendQrCodeEmail(userEmail, qrData.toString());
        } catch (MessagingException e) {
            System.err.println("Failed to send QR code email: " + e.getMessage());
        }


        return bookings;
    }

    private int parseSeat(String seat) {
        try {
            return Integer.parseInt(seat.replaceAll("[^0-9]", ""));
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    @Transactional
    public void deleteBooking(Long bookingId, String email) {
        Booking existing = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!existing.getUsers().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to delete this booking");
        }

        bookingRepo.delete(existing);
    }


    @Transactional
    public Booking updateBook(Long bookingId, Booking updatedBooking, String email) {
        Booking existing = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!existing.getUsers().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to update this booking");
        }

        // Update allowed fields
        existing.setSeatNumber(updatedBooking.getSeatNumber());
        return bookingRepo.save(existing);
    }

    public List<Booking> getAllBookings(){
        return bookingRepo.findAll();
    }

    public Optional<Booking> getBookingById(Long id){
        return bookingRepo.findById(id);
    }

    public List<Booking> getBookingsByUserEmail(String email) {
        return bookingRepo.findByUsers_Email(email);
    }

    public Booking adminUpdateBooking(Long id, Booking updatedBooking) {
        Booking existing = bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        existing.setSeatNumber(updatedBooking.getSeatNumber());
        return bookingRepo.save(existing);
    }

    public void adminDeleteBooking(Long id) {
        if (!bookingRepo.existsById(id)) {
            throw new RuntimeException("Booking not found");
        }
        bookingRepo.deleteById(id);
    }



}
