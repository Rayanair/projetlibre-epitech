public class ParentEleveDto  {
    public int Id { get; set; }
    public int EleveId { get; set; }
    public int ParentId { get; set; }
    public User? Eleve { get; set; }
    public User? Parent { get; set; }
}