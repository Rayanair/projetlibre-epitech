using Microsoft.EntityFrameworkCore;

public class LevelRepository : ILevelRepository
{
    private readonly DbContextProject dbContext;

    public LevelRepository(DbContextProject dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<ICollection<LevelDto>> GetLevel()
    {
        var levels = await dbContext.Level.ToListAsync();
        return levels.Select(p => new LevelDto
        {
            Id = p.Id,
            LevelId = p.LevelId,
            UserId = p.UserId,
            MatieresId = p.MatieresId,
            Badge = p.Badge,
        }).ToList();
    }

    public async Task<ICollection<LevelDto>> GetLevelById(int UserId)
{
    var levels = await dbContext.Level
        .Include(p => p.User) 
        .Where(p => p.UserId == UserId)
        .Select(m => new LevelDto
        {
            Id = m.Id,
            LevelId = m.LevelId,
            UserId = m.UserId,
            MatieresId = m.MatieresId,
            Badge = m.Badge,
        })
        .ToListAsync();
    
    if (levels == null || !levels.Any())
    {
        throw new Exception("Matieres not found");
    }

    return levels;
}

    public async Task<LevelDto> CreateLevel(LevelDto levelDto)
    {
        var newLevel = new Level
        {
            LevelId = levelDto.LevelId,
            UserId = levelDto.UserId,
            MatieresId = levelDto.MatieresId,
            Badge = levelDto.Badge,
            // Set other properties if needed
        };

        dbContext.Level.Add(newLevel);
        await dbContext.SaveChangesAsync();

        return new LevelDto
        {
            Id = newLevel.Id,
            LevelId = newLevel.LevelId,
            UserId = newLevel.UserId,
            MatieresId = newLevel.MatieresId,
            Badge = newLevel.Badge,
            // Map other properties if needed
        };
    }

    // public async Task<int> UpdateMatiere(MatiereDto matiereDto)
    // {
    //     var matiere = await dbContext.Matieres.SingleOrDefaultAsync(p => p.UserId == matiereDto.UserId && p.MatiereId == matiereDto.MatiereId);
    //     if (matiere == null)
    //     {
    //         throw new Exception("Matiere not found");
    //     }

    //     matiere.Level = matiereDto.Level;
    //     // Update other properties if needed

    //     await dbContext.SaveChangesAsync();
    //     return matiere.Id;
    // }

    public async Task<int> DeleteLevel(int id)
    {
        var level = await dbContext.Level.SingleOrDefaultAsync(p => p.Id == id);
        if (level == null)
        {
            throw new Exception("Matiere not found");
        }

        dbContext.Level.Remove(level);
        await dbContext.SaveChangesAsync();
        return level.Id;
    }
}