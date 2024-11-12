using Microsoft.EntityFrameworkCore;

public class ParentEleveRepository : IParentEleveRepository
{
    private readonly DbContextProject _dbContext;

    public ParentEleveRepository(DbContextProject dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ICollection<ParentEleveDto>> GetParentEleves()
    {
        var parentEleve = await _dbContext.ParentEleve.ToListAsync();
        return parentEleve.Select(pe => new ParentEleveDto
        {
            Id = pe.Id,
            EleveId = pe.EleveId,
            ParentId = pe.ParentId,
            Eleve = pe.Eleve,
            Parent = pe.Parent,

        }).ToList();
    }

    public async Task<ICollection<ParentEleveDto>> GetParentEleveById(int parentid)
    {
        var parentEleve = await _dbContext.ParentEleve
        .Include(e => e.Eleve)
        .Include(e => e.Parent)
        .Where(p => p.ParentId == parentid)
        .Select(parentEleve => new ParentEleveDto
        {
            Id = parentEleve.Id,
            EleveId = parentEleve.EleveId,
            ParentId = parentEleve.ParentId,
            Eleve = parentEleve.Eleve,
            Parent = parentEleve.Parent,
        })
        .ToListAsync();
    
    if (parentEleve == null || !parentEleve.Any())
    {
        throw new Exception("Matieres not found");
    }

    return parentEleve;
        // .SingleOrDefaultAsync(pe => pe.Id == parentid);
        // if (parentEleve == null)
        // {
        //     throw new Exception("ParentEleve not found");
        // }
        // return new ParentEleveDto
        // {
        //     Id = parentEleve.Id,
        //     EleveId = parentEleve.EleveId,
        //     ParentId = parentEleve.ParentId,
        //     Eleve = parentEleve.Eleve,
        //     Parent = parentEleve.Parent,
        // };
    }

    public async Task<ParentEleveDto> CreateParentEleve(ParentEleveDto parentEleveDto)
    {
        var newParentEleve = new ParentEleve
        {
            EleveId = parentEleveDto.EleveId,
            ParentId = parentEleveDto.ParentId,
        };
        _dbContext.ParentEleve.Add(newParentEleve);
        await _dbContext.SaveChangesAsync();
        return new ParentEleveDto
        {
            Id = newParentEleve.Id,
            EleveId = newParentEleve.EleveId,
            ParentId = newParentEleve.ParentId,
            Eleve = newParentEleve.Eleve,
            Parent = newParentEleve.Parent
        };
    }

    public async Task<int> UpdateParentEleve(ParentEleveDto parentEleveDto)
    {
        var parentEleve = await _dbContext.ParentEleve.SingleOrDefaultAsync(pe => pe.Id == parentEleveDto.Id);
        if (parentEleve == null)
        {
            throw new Exception("ParentEleve not found");
        }
        parentEleve.EleveId = parentEleveDto.EleveId;
        parentEleve.ParentId = parentEleveDto.ParentId;
        await _dbContext.SaveChangesAsync();
        return parentEleve.Id;
    }

    public async Task<int> DeleteParentEleve(int id)
    {
        var parentEleve = await _dbContext.ParentEleve.SingleOrDefaultAsync(pe => pe.Id == id);
        if (parentEleve == null)
        {
            throw new Exception("ParentEleve not found");
        }
        _dbContext.ParentEleve.Remove(parentEleve);
        await _dbContext.SaveChangesAsync();
        return parentEleve.Id;
    }
}