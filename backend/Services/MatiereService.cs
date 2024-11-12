public class MatiereService : IMatiereService
{
    private readonly IMatiereRepository _matiereRepository;

    public MatiereService(IMatiereRepository matiereRepository)
    {
        _matiereRepository = matiereRepository;
    }

    public Task<ICollection<MatiereDto>> GetMatieres()
    {
        return _matiereRepository.GetMatieres();
    }

    public Task<ICollection<MatiereDto>> GetMatiereById(int UserId)
    {
        return _matiereRepository.GetMatiereById(UserId);
    }

    public Task<MatiereDto> CreateMatiere(MatiereDto matiere)
    {
        return _matiereRepository.CreateMatiere(matiere);
    }

    public Task<int> UpdateMatiere(MatiereDto matiere)
    {
        return _matiereRepository.UpdateMatiere(matiere);
    }

    public Task<int> DeleteMatiere(int id)
    {
        return _matiereRepository.DeleteMatiere(id);
    }
}