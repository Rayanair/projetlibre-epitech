public class PlanningService : IPlanningService
{
    private readonly IPlanningRepository _planningRepository;

    public PlanningService(IPlanningRepository planningRepository)
    {
        _planningRepository = planningRepository;
    }

    public Task<PlanningDto> CreatePlanning(PlanningDto planning)
    {
        return _planningRepository.CreatePlanning(planning);
    }

    public Task<PlanningDto> GetPlanningById(int id)
    {
        return _planningRepository.GetPlanningById(id);
    }

    public Task<ICollection<PlanningDto>> GetPlanningByDate(string date)
    {
        return _planningRepository.GetPlanningByDate(date);
    }

    public Task<ICollection<PlanningDto>> GetPlanningByClasse(int idClasse)
    {
        return _planningRepository.GetPlanningByClasse(idClasse);
    }

    public Task<ICollection<PlanningDto>> GetAllPlannings()
    {
        return _planningRepository.GetAllPlannings();
    }

    public Task<int> UpdatePlanning(PlanningDto planning)
    {
        return _planningRepository.UpdatePlanning(planning);
    }

    public Task<int> DeletePlanning(int id)
    {
        return _planningRepository.DeletePlanning(id);
    }
}
