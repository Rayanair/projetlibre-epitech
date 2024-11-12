public class ClasseService : IClasseService
{
    public IClasseRepository _classeRepository;
    public ClasseService(IClasseRepository classeRepository)
    {
        _classeRepository = classeRepository;
    }

    public Task<ICollection<ClasseDto>> GetClasses()
    {
        return _classeRepository.GetClasses();
    }

    public Task<ClasseDto> GetClasseByCode(string Code)
    {
        return _classeRepository.GetClasseByCode(Code);
    }

    public Task<ClasseDto> GetClasseById(int id)
    {
        return _classeRepository.GetClasseById(id);
    }

    public Task<ClasseDto> CreateClasse(ClasseDto classe)
    {
        return _classeRepository.CreateClasse(classe);
    }

    public Task<int> UpdateClasse(ClasseDto classe)
    {
        return _classeRepository.UpdateClasse(classe);
    }

    public Task<int> DeleteClasse(int id)
    {
        return _classeRepository.DeleteClasse(id);
    }
}