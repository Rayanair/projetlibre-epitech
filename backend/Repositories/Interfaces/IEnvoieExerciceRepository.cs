
public interface IEnvoieExerciceRepository
{
    Task<EnvoieExerciceDto> CreateExercice(EnvoieExerciceDto exercice);
    Task<EnvoieExerciceDto> GetExerciceById(int id);
    Task<ICollection<EnvoieExerciceDto>> GetExercicesByEleve(int idEleve);
    Task<ICollection<EnvoieExerciceDto>> GetExercicesByProf(int idProf);
    Task<ICollection<EnvoieExerciceDto>> GetAllExercices();
    Task<int> UpdateExercice(EnvoieExerciceDto exercice);
    Task<int> DeleteExercice(int id);
}
