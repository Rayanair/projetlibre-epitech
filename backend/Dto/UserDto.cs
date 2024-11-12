public class UserDto {
    public int Id {get; set;}
    public required string FirstName {get; set;}
    public required string LastName {get; set;}
    public required string Email {get; set;}
    public required string Password {get; set;}
    public required string Code {get; set;}
    public int Avatar {get; set;}
    public int? ClasseId {get; set;}
    public int RoleId {get; set;}
    public Role? Role {get; set;}
    public Classe? Classe {get; set;}
}