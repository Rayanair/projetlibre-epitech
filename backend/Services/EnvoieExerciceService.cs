
public class EnvoieExerciceService : IEnvoieExerciceService
{
    private readonly IEnvoieExerciceRepository _envoieExerciceRepository;

    public EnvoieExerciceService(IEnvoieExerciceRepository envoieExerciceRepository)
    {
        _envoieExerciceRepository = envoieExerciceRepository;
    }

    // Crée un nouvel exercice
    public Task<EnvoieExerciceDto> CreateExercice(EnvoieExerciceDto exercice)
    {
        return _envoieExerciceRepository.CreateExercice(exercice);
    }

    // Récupère un exercice par son ID
    public Task<EnvoieExerciceDto> GetExerciceById(int id)
    {
        return _envoieExerciceRepository.GetExerciceById(id);
    }

    // Récupère les exercices d'un élève par son ID
    public Task<ICollection<EnvoieExerciceDto>> GetExercicesByEleve(int idEleve)
    {
        return _envoieExerciceRepository.GetExercicesByEleve(idEleve);
    }

    // Récupère les exercices d'un professeur par son ID
    public Task<ICollection<EnvoieExerciceDto>> GetExercicesByProf(int idProf)
    {
        return _envoieExerciceRepository.GetExercicesByProf(idProf);
    }

    // Récupère tous les exercices
    public Task<ICollection<EnvoieExerciceDto>> GetAllExercices()
    {
        return _envoieExerciceRepository.GetAllExercices();
    }

    // Met à jour un exercice
    public Task<int> UpdateExercice(EnvoieExerciceDto exercice)
    {
        return _envoieExerciceRepository.UpdateExercice(exercice);
    }

    // Supprime un exercice par son ID
    public Task<int> DeleteExercice(int id)
    {
        return _envoieExerciceRepository.DeleteExercice(id);
    }
}
