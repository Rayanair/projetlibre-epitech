using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class EnvoieExerciceRepository(DbContextProject dbContext) : IEnvoieExerciceRepository
{
    // Récupère tous les exercices
    public async Task<ICollection<EnvoieExerciceDto>> GetAllExercices()
    {
        var exercices = await dbContext.EnvoieExercice.ToListAsync();
        return exercices.Select(e => new EnvoieExerciceDto
        {
            Id = e.Id,
            IdProf = e.IdProf,
            IdEleve = e.IdEleve,
            Exo = e.Exo,
            Matiere = e.Matiere,
            Valide = e.Valide
        }).ToList();
    }

    // Récupère un exercice par son ID
    public async Task<EnvoieExerciceDto> GetExerciceById(int id)
    {
        var exercice = await dbContext.EnvoieExercice.SingleOrDefaultAsync(e => e.Id == id);
        if (exercice == null)
        {
            throw new Exception("Exercice not found");
        }
        return new EnvoieExerciceDto
        {
            Id = exercice.Id,
            IdProf = exercice.IdProf,
            IdEleve = exercice.IdEleve,
            Exo = exercice.Exo,
            Matiere = exercice.Matiere,
            Valide = exercice.Valide
        };
    }

    // Récupère les exercices par l'ID d'un élève
    public async Task<ICollection<EnvoieExerciceDto>> GetExercicesByEleve(int idEleve)
    {
        var exercices = await dbContext.EnvoieExercice
            .Where(e => e.IdEleve == idEleve)
            .ToListAsync();

        return exercices.Select(e => new EnvoieExerciceDto
        {
            Id = e.Id,
            IdProf = e.IdProf,
            IdEleve = e.IdEleve,
            Exo = e.Exo,
            Matiere = e.Matiere,
            Valide = e.Valide
        }).ToList();
    }

    // Récupère les exercices par l'ID d'un professeur
    public async Task<ICollection<EnvoieExerciceDto>> GetExercicesByProf(int idProf)
    {
        var exercices = await dbContext.EnvoieExercice
            .Where(e => e.IdProf == idProf)
            .ToListAsync();

        return exercices.Select(e => new EnvoieExerciceDto
        {
            Id = e.Id,
            IdProf = e.IdProf,
            IdEleve = e.IdEleve,
            Exo = e.Exo,
            Matiere = e.Matiere,
            Valide = e.Valide
        }).ToList();
    }

    // Crée un nouvel exercice
    public async Task<EnvoieExerciceDto> CreateExercice(EnvoieExerciceDto exerciceDto)
    {
        var exercice = new EnvoieExercice
        {
            IdProf = exerciceDto.IdProf,
            IdEleve = exerciceDto.IdEleve,
            Exo = exerciceDto.Exo,
            Matiere = exerciceDto.Matiere,
            Valide = exerciceDto.Valide
        };
        dbContext.EnvoieExercice.Add(exercice);
        await dbContext.SaveChangesAsync();

        exerciceDto.Id = exercice.Id; // Met à jour l'ID dans le DTO
        return exerciceDto;
    }

    // Met à jour un exercice existant
    public async Task<int> UpdateExercice(EnvoieExerciceDto exerciceDto)
    {
        var exercice = await dbContext.EnvoieExercice.SingleOrDefaultAsync(e => e.Id == exerciceDto.Id);
        if (exercice == null)
        {
            throw new Exception("Exercice not found");
        }

        exercice.IdProf = exerciceDto.IdProf;
        exercice.IdEleve = exerciceDto.IdEleve;
        exercice.Exo = exerciceDto.Exo;
        exercice.Matiere = exerciceDto.Matiere;
        exercice.Valide = exerciceDto.Valide;

        await dbContext.SaveChangesAsync();
        return exercice.Id;
    }

    // Supprime un exercice par son ID
    public async Task<int> DeleteExercice(int id)
    {
        var exercice = await dbContext.EnvoieExercice.SingleOrDefaultAsync(e => e.Id == id);
        if (exercice == null)
        {
            throw new Exception("Exercice not found");
        }

        dbContext.EnvoieExercice.Remove(exercice);
        await dbContext.SaveChangesAsync();
        return exercice.Id;
    }
}
