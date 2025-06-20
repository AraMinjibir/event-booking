package mlk.eventbookingsystem.dto;

public class AuthResponse {
    private String token;
    private String email;
    private String  role;


    public String getRole() {
        return role;
    }


    public AuthResponse(String token, String role, String email) {
        this.token = token;
        this.email = email;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
