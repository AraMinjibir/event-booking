package mlk.eventbookingsystem.entities;

public enum UserRole {
    ADMIN,
    USER,
    ORGANIZER;

    public String getAuthority() {
        return "ROLE_" + this.name();
    }

    public static UserRole fromString(String text) {
        for (UserRole role : UserRole.values()) {
            if (role.name().equalsIgnoreCase(text)) {
                return role;
            }
        }
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }

}
