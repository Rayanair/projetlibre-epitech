using Microsoft.EntityFrameworkCore;

public class MatiereRepository : IMatiereRepository
{
    private readonly DbContextProject dbContext;

    public MatiereRepository(DbContextProject dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<ICollection<MatiereDto>> GetMatieres()
    {
        var matieres = await dbContext.Matieres.ToListAsync();
        return matieres.Select(p => new MatiereDto
        {
            Id = p.Id,
            UserId = p.UserId,
            MatiereId = p.MatiereId,
            Level = p.Level,
        }).ToList();
    }

    public async Task<ICollection<MatiereDto>> GetMatiereById(int UserId)
{
    var matieres = await dbContext.Matieres
        .Include(p => p.User) 
        .Where(p => p.UserId == UserId)
        .Select(m => new MatiereDto
        {
            Id = m.Id,
            UserId = m.UserId,
            MatiereId = m.MatiereId,
            Level = m.Level,
        })
        .ToListAsync();
    
    if (matieres == null || !matieres.Any())
    {
        throw new Exception("Matieres not found");
    }

    return matieres;
}

    public async Task<MatiereDto> CreateMatiere(MatiereDto matiereDto)
    {
        var newMatiere = new Matieres
        {
            UserId = matiereDto.UserId,
            MatiereId = matiereDto.MatiereId,
            Level = matiereDto.Level,
            // Set other properties if needed
        };

        dbContext.Matieres.Add(newMatiere);
        await dbContext.SaveChangesAsync();

        return new MatiereDto
        {
            Id = newMatiere.Id,
            UserId = newMatiere.UserId,
            MatiereId = newMatiere.MatiereId,
            Level = newMatiere.Level,
            // Map other properties if needed
        };
    }

    public async Task<int> UpdateMatiere(MatiereDto matiereDto)
    {
        var matiere = await dbContext.Matieres.SingleOrDefaultAsync(p => p.UserId == matiereDto.UserId && p.MatiereId == matiereDto.MatiereId);
        if (matiere == null)
        {
            throw new Exception("Matiere not found");
        }

        matiere.Level = matiereDto.Level;
        // Update other properties if needed

        await dbContext.SaveChangesAsync();
        return matiere.Id;
    }

    public async Task<int> DeleteMatiere(int id)
    {
        var matiere = await dbContext.Matieres.SingleOrDefaultAsync(p => p.Id == id);
        if (matiere == null)
        {
            throw new Exception("Matiere not found");
        }

        dbContext.Matieres.Remove(matiere);
        await dbContext.SaveChangesAsync();
        return matiere.Id;
    }
}