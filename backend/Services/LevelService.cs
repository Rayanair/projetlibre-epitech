public class LevelService : ILevelService
{
    private readonly ILevelRepository _levelRepository;

    public LevelService(ILevelRepository levelRepository)
    {
        _levelRepository = levelRepository;
    }

    public Task<ICollection<LevelDto>> GetLevel()
    {
        return _levelRepository.GetLevel();
    }

    public Task<ICollection<LevelDto>> GetLevelById(int UserId)
    {
        return _levelRepository.GetLevelById(UserId);
    }

    public Task<LevelDto> CreateLevel(LevelDto level)
    {
        return _levelRepository.CreateLevel(level);
    }

    // public Task<int> UpdateLevel(LevelDto level)
    // {
    //     return _levelRepository.UpdateLevel(level);
    // }

    public Task<int> DeleteLevel(int id)
    {
        return _levelRepository.DeleteLevel(id);
    }
}