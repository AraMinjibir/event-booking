package mlk.eventbookingsystem.controllers;

import com.google.zxing.WriterException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import mlk.eventbookingsystem.QRCodeGenerator;
import mlk.eventbookingsystem.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/extras")
@RequiredArgsConstructor
public class QRCodeControler {

    private final EmailService emailService;

    @PostMapping("/send-qr")
    public ResponseEntity<?> sendQrCode(@RequestParam String email, @RequestParam String data) {
        try {
            System.out.println("Sending QR to " + email + " with data: " + data);
            emailService.sendQrCodeEmail(email, data);
            return ResponseEntity.ok("QR code sent to " + email);
        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
        }
    }
}
