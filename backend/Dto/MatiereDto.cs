public class MatiereDto {
    public int Id {get; set;}
    public required int UserId {get; set;}
    public required int MatiereId {get; set;}
    public required int Level {get; set;}
    public User? User {get; set;}
}