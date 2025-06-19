package mlk.eventbookingsystem.repos;

import mlk.eventbookingsystem.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUsers_Email(String email);
    @Query("SELECT b.seatCode FROM Booking b WHERE b.events.id = :eventId")
    List<String> findByEventsId(Long eventId);
    boolean existsByEventsIdAndSeatCode(Long eventId, String seatCode);


}
