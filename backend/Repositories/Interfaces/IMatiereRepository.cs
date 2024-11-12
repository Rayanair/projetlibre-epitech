public interface IMatiereRepository {
    Task<ICollection<MatiereDto>> GetMatieres();
    Task<ICollection<MatiereDto>> GetMatiereById(int UserId);
    Task<MatiereDto> CreateMatiere(MatiereDto matiere);
    Task<int> UpdateMatiere(MatiereDto matiere);
    Task<int> DeleteMatiere(int id);
}