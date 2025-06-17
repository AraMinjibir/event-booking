package mlk.eventbookingsystem.dto;

import java.util.List;

public class BookingRequest {
    private Long eventId;
    private List<String> selectedSeats;


    public List<String> getSelectedSeats() {
        return selectedSeats;
    }

    public void setSelectedSeats(List<String> selectedSeats) {
        this.selectedSeats = selectedSeats;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
}
