using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.ObjectModel;


public class PlanningController : ControllerBase
{
    private readonly IPlanningService _planningService;

    public PlanningController(IPlanningService planningService)
    {
        _planningService = planningService;
    }

    // Création d'une nouvelle tâche dans le planning
    [HttpPost]
    [Route("Planning/Create")]
    public Task<PlanningDto> CreatePlanning([FromBody] PlanningDto planning)
    {
        return _planningService.CreatePlanning(planning);
    }

    // Récupérer une tâche par son ID
    [HttpGet]
    [Route("Planning/Get")]
    public Task<PlanningDto> GetPlanning(int id)
    {
        return _planningService.GetPlanningById(id);
    }

    // Récupérer toutes les tâches pour une date spécifique
    [HttpGet]
    [Route("Planning/Date/{date}")]
    public async Task<IActionResult> GetPlanningByDate(string date)
    {
        var tasks = await _planningService.GetPlanningByDate(date);
        if (tasks == null || tasks.Count == 0)
        {
            return NotFound(); // Retourne un 404 si aucune tâche n'est trouvée pour cette date
        }
        return Ok(tasks);
    }

    // Récupérer toutes les tâches pour une classe spécifique
    [HttpGet]
    [Route("Planning/Classe/{idClasse}")]
    public async Task<IActionResult> GetPlanningByClasse(int idClasse)
    {
        var tasks = await _planningService.GetPlanningByClasse(idClasse);
        if (tasks == null || tasks.Count == 0)
        {
            return NotFound(); // Retourne un 404 si aucune tâche n'est trouvée pour cette classe
        }
        return Ok(tasks);
    }

    // Récupérer toutes les tâches
    [HttpGet]
    [Route("Planning/GetAll")]
    public Task<ICollection<PlanningDto>> GetAllPlannings()
    {
        return _planningService.GetAllPlannings();
    }

    // Mettre à jour une tâche existante
    [HttpPut]
    [Route("Planning/Update")]
    public Task<int> UpdatePlanning([FromBody] PlanningDto planning)
    {
        return _planningService.UpdatePlanning(planning);
    }

    // Supprimer une tâche par son ID
    [HttpDelete]
    [Route("Planning/Delete")]
    public Task<int> DeletePlanning([FromBody] int id)
    {
        return _planningService.DeletePlanning(id);
    }
}
