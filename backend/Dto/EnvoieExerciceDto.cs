public class EnvoieExerciceDto {
    public int Id {get; set;}
    public required int IdProf {get; set;}
    public required int IdEleve {get; set;}
    public required int Exo {get; set;}
    public required int Matiere {get; set;}
    public required int Valide {get; set;}
}