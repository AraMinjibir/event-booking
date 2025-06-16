# Event Booking System

The Event Booking System is a full-stack web app that allows:

Admins to manage events and bookings.

Users to browse events, select seats, and receive QR-coded tickets via email.

Assumptions:
Events are time-bound.

Seats are unique per event.

Tickets are emailed automatically.

Roles are clearly separated (Admin vs User).

Tech Stack:
Backend: Spring Boot, REST APIs, JWT Auth, Spring Security, JavaMail, JPA

Frontend: Angular (calendar view, seat picker, QR code display)

Database: PostgreSQL / MySQL

Extras: QR Code Generator, Email Notifications


How to Run

cd frontend npm install, ng serve

cd backend ./mvnw spring-boot:run

