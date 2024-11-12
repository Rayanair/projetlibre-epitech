public class Level {
    public int Id {get; set;}
    public required int LevelId {get; set;}
    public required int UserId {get; set;}
    public required int MatieresId {get; set;}
    public required int Badge {get; set;}
    public User? User {get; set;}
    public Matieres? Matieres {get; set;}
}