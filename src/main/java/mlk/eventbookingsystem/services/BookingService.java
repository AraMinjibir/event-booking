package mlk.eventbookingsystem.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mlk.eventbookingsystem.entities.Booking;
import mlk.eventbookingsystem.repos.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepo;

    @Transactional
    public Booking createBooking(Booking book){
        return bookingRepo.save(book);
    }

    @Transactional
    public void deleteBooking(Long id){
        bookingRepo.deleteById(id);
    }

    @Transactional
    public Booking updateBook(Long id, Booking updatedBook){
        return bookingRepo.findById(id).map(book ->{
            book.setUsers(updatedBook.getUsers());
            book.setBookedAt(updatedBook.getBookedAt());
            book.setEvents(updatedBook.getEvents());
            book.setQrCode(updatedBook.getQrCode());
            book.setSeatNumber(updatedBook.getSeatNumber());

            return bookingRepo.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not found!."));
    }

    public List<Booking> getAllBookings(){
        return bookingRepo.findAll();
    }

    public Optional<Booking> getBookingById(Long id){
        return bookingRepo.findById(id);
    }
}
