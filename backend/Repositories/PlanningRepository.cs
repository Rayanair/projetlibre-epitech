using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class PlanningRepository : IPlanningRepository
{
    private readonly DbContextProject dbContext;

    public PlanningRepository(DbContextProject dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<PlanningDto> CreatePlanning(PlanningDto planningDto)
    {
        var newPlanning = new Planning
        {
            Title = planningDto.Title,
            Description = planningDto.Description,
            Date = planningDto.Date,
            Time = planningDto.Time,
            IdClasse = planningDto.IdClasse
        };

        dbContext.Planning.Add(newPlanning);
        await dbContext.SaveChangesAsync();

        return new PlanningDto
        {
            Id = newPlanning.Id,
            Title = newPlanning.Title,
            Description = newPlanning.Description,
            Date = newPlanning.Date,
            Time = newPlanning.Time,
            IdClasse = newPlanning.IdClasse
        };
    }

    public async Task<PlanningDto> GetPlanningById(int id)
    {
        var planning = await dbContext.Planning.SingleOrDefaultAsync(p => p.Id == id);
        if (planning == null)
        {
            throw new Exception("Planning not found");
        }
        return new PlanningDto
        {
            Id = planning.Id,
            Title = planning.Title,
            Description = planning.Description,
            Date = planning.Date,
            Time = planning.Time,
            IdClasse = planning.IdClasse
        };
    }

    public async Task<ICollection<PlanningDto>> GetPlanningByDate(string date)
    {
        var plannings = await dbContext.Planning
            .Where(p => p.Date == date)
            .ToListAsync();

        return plannings.Select(p => new PlanningDto
        {
            Id = p.Id,
            Title = p.Title,
            Description = p.Description,
            Date = p.Date,
            Time = p.Time,
            IdClasse = p.IdClasse
        }).ToList();
    }

    public async Task<ICollection<PlanningDto>> GetPlanningByClasse(int idClasse)
    {
        var plannings = await dbContext.Planning
            .Where(p => p.IdClasse == idClasse)
            .ToListAsync();

        return plannings.Select(p => new PlanningDto
        {
            Id = p.Id,
            Title = p.Title,
            Description = p.Description,
            Date = p.Date,
            Time = p.Time,
            IdClasse = p.IdClasse
        }).ToList();
    }

    public async Task<ICollection<PlanningDto>> GetAllPlannings()
    {
        var plannings = await dbContext.Planning.ToListAsync();
        return plannings.Select(p => new PlanningDto
        {
            Id = p.Id,
            Title = p.Title,
            Description = p.Description,
            Date = p.Date,
            Time = p.Time,
            IdClasse = p.IdClasse
        }).ToList();
    }

    public async Task<int> UpdatePlanning(PlanningDto planningDto)
    {
        var planning = await dbContext.Planning.SingleOrDefaultAsync(p => p.Id == planningDto.Id);
        if (planning == null)
        {
            throw new Exception("Planning not found");
        }
        planning.Title = planningDto.Title;
        planning.Description = planningDto.Description;
        planning.Date = planningDto.Date;
        planning.Time = planningDto.Time;
        planning.IdClasse = planningDto.IdClasse;

        await dbContext.SaveChangesAsync();
        return planning.Id;
    }

    public async Task<int> DeletePlanning(int id)
    {
        var planning = await dbContext.Planning.SingleOrDefaultAsync(p => p.Id == id);
        if (planning == null)
        {
            throw new Exception("Planning not found");
        }
        dbContext.Planning.Remove(planning);
        await dbContext.SaveChangesAsync();
        return planning.Id;
    }
}
