package mlk.eventbookingsystem.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Event {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String location;
    private LocalDate dateTime;
    private String halls;
    private int totalSeat;
    private int availableSeat;
    private String description;
    private String imageUrl;



    public Event(Long id, String location, LocalDate dateTime, String halls,
                 int totalSeat, int availableSeat, String description, String imageUrl) {
        this.id = id;
        this.location =  location;
        this.dateTime = dateTime;
        this.halls = halls;
        this.totalSeat = totalSeat;
        this.availableSeat = availableSeat;
        this.description = description;
        this.imageUrl = imageUrl;

    }

    public Event() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
    }

    public String getHalls() {
        return halls;
    }

    public void setHalls(String halls) {
        this.halls = halls;
    }

    public int getTotalSeat() {
        return totalSeat;
    }

    public void setTotalSeat(int totalSeat) {
        this.totalSeat = totalSeat;
    }

    public int getAvailableSeat() {
        return availableSeat;
    }

    public void setAvailableSeat(int availableSeat) {
        this.availableSeat = availableSeat;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
