using Microsoft.EntityFrameworkCore;

public class ClasseRepository(DbContextProject dbContext) : IClasseRepository {

    public async Task<ICollection<ClasseDto>> GetClasses(){
        var classes = await dbContext.Classe.ToListAsync();
        return classes.Select(p => new ClasseDto{
            Id = p.Id,
            User = p.User,
            NameClasse = p.NameClasse,
            Code = p.Code,
        }).ToList();
    }

    public async Task<ClasseDto> GetClasseByCode(string Code){
        var classe = await dbContext.Classe.SingleOrDefaultAsync(p => p.Code == Code);
        if (classe == null){
            throw new Exception("User not found");
        }
        return new ClasseDto{
            Id = classe.Id,
            User = classe.User,
            NameClasse = classe.NameClasse,
            Code = classe.Code,
        };
    }


    public async Task<ClasseDto> GetClasseById(int id){
        var classe = await dbContext.Classe.SingleOrDefaultAsync(p => p.Id == id);
        if (classe == null){
            throw new Exception("User not found");
        }
        return new ClasseDto{
            Id = classe.Id,
            User = classe.User,
            NameClasse = classe.NameClasse,
            Code = classe.Code,

        };
    }

    public async Task<ClasseDto> CreateClasse(ClasseDto classeDto){
        var newClasse = new Classe{
            User = classeDto.User,
            NameClasse = classeDto.NameClasse,
            Code = classeDto.Code,
           
        };
        dbContext.Classe.Add(newClasse);
        await dbContext.SaveChangesAsync();
        return new ClasseDto{
            Id = newClasse.Id,
            User = newClasse.User,
            NameClasse = newClasse.NameClasse,
            Code = newClasse.Code

        };
    }

    public async Task<int> UpdateClasse(ClasseDto classeDto){
        var classe = await dbContext.Classe.SingleOrDefaultAsync(p => p.Id == classeDto.Id);
        if (classe == null){
            throw new Exception("User not found");
        }
        classe.NameClasse = classeDto.NameClasse;
        await dbContext.SaveChangesAsync();
        return classe.Id;
    }

    public async Task<int> DeleteClasse(int id){
        var classe = await dbContext.Classe.SingleOrDefaultAsync(p => p.Id == id);
        if (classe == null){
            throw new Exception("User not found");
        }
        dbContext.Classe.Remove(classe);
        await dbContext.SaveChangesAsync();
        return classe.Id;
    }

}