public interface IPlanningService
{
    Task<PlanningDto> CreatePlanning(PlanningDto planning);
    Task<PlanningDto> GetPlanningById(int id);
    Task<ICollection<PlanningDto>> GetPlanningByDate(string date);
    Task<ICollection<PlanningDto>> GetPlanningByClasse(int idClasse);
    Task<ICollection<PlanningDto>> GetAllPlannings();
    Task<int> UpdatePlanning(PlanningDto planning);
    Task<int> DeletePlanning(int id);
}