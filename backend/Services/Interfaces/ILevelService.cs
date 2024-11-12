public interface ILevelService {
    Task<ICollection<LevelDto>> GetLevel();
    Task<ICollection<LevelDto>> GetLevelById(int UserId);
    Task<LevelDto> CreateLevel(LevelDto level);
    // Task<int> UpdateLevel(LevelDto level);
    Task<int> DeleteLevel(int id);
}