public interface ILevelRepository {
    Task<ICollection<LevelDto>> GetLevel();
    Task<ICollection<LevelDto>> GetLevelById(int UserId);
    Task<LevelDto> CreateLevel(LevelDto level);
    // Task<int> UpdateMatiere(MatiereDto matiere);
    Task<int> DeleteLevel(int id);
}