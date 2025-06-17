package mlk.eventbookingsystem.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate bookedAt;
    private int seatNumber;
    private String qrCode;

    @ManyToOne(fetch = FetchType.EAGER)
    private User users;
    @ManyToOne(fetch = FetchType.EAGER)
    private Event events;

    public Booking() {
    }

    public Booking(Long id, LocalDate bookedAt, int seatNumber, String qrCode) {
        this.id = id;
       this.bookedAt = bookedAt;
       this.seatNumber = seatNumber;
       this.qrCode = qrCode;
    }

    public Event getEvents() {
        return events;
    }

    public void setEvents(Event events) {
        this.events = events;
    }

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public int getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(int seatNumber) {
        this.seatNumber = seatNumber;
    }

    public LocalDate getBookedAt() {
        return bookedAt;
    }

    public void setBookedAt(LocalDate bookedAt) {
        this.bookedAt = bookedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
