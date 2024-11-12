public interface IClasseService
{
    Task<ClasseDto> CreateClasse(ClasseDto classe);
    Task<ClasseDto> GetClasseById(int id);
    Task<ClasseDto> GetClasseByCode(string Code);
    Task<ICollection<ClasseDto>> GetClasses();
    Task<int> UpdateClasse(ClasseDto classe);
    Task<int> DeleteClasse(int id);
}