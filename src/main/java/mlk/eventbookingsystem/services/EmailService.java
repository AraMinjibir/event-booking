package mlk.eventbookingsystem.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendQrCodeEmail(String to, String data) throws MessagingException {
        // Generate QR
        BufferedImage qrImage = generateQRCode(data);

        // Convert to ByteArray
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ImageIO.write(qrImage, "png", baos);
        } catch (Exception e) {
            throw new MessagingException("Failed to write QR image", e);
        }

        // Compose email
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject("Your QR Code");
        helper.setText("Please find your QR code attached.", true);

        InputStreamSource qrAttachment = new ByteArrayResource(baos.toByteArray());
        helper.addAttachment("qrcode.png", qrAttachment);

        mailSender.send(message);
    }


    private BufferedImage generateQRCode(String text) throws MessagingException {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            var bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 250, 250);
            return MatrixToImageWriter.toBufferedImage(bitMatrix);
        } catch (WriterException e) {
            throw new MessagingException("Could not generate QR code", e);
        }
    }
}
