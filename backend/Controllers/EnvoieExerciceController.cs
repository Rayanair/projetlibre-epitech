using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;

[Route("EnvoieExercice")]
public class EnvoieExerciceController : ControllerBase
{
    private readonly IEnvoieExerciceService _envoieExerciceService;

    public EnvoieExerciceController(IEnvoieExerciceService envoieExerciceService)
    {
        _envoieExerciceService = envoieExerciceService;
    }

    // Crée un nouvel exercice
    [HttpPost]
    [Route("Create")]
    public Task<EnvoieExerciceDto> CreateExercice([FromBody] EnvoieExerciceDto exercice)
    {
        return _envoieExerciceService.CreateExercice(exercice);
    }

    // Récupère un exercice par son ID
    [HttpGet]
    [Route("Get")]
    public Task<EnvoieExerciceDto> GetExercice(int id)
    {
        return _envoieExerciceService.GetExerciceById(id);
    }

    // Récupère tous les exercices
    [HttpGet]
    [Route("GetAll")]
    public Task<ICollection<EnvoieExerciceDto>> GetAllExercices()
    {
        return _envoieExerciceService.GetAllExercices();
    }

    // Récupère les exercices d'un élève par son ID
    [HttpGet]
    [Route("Eleve/{idEleve}")]
    public async Task<IActionResult> GetExercicesByEleve(int idEleve)
    {
        var exercices = await _envoieExerciceService.GetExercicesByEleve(idEleve);

        if (exercices == null || exercices.Count == 0)
        {
            return NotFound(); // 404 si aucun exercice trouvé
        }

        return Ok(exercices); // 200 avec la liste des exercices
    }

    // Récupère les exercices d'un professeur par son ID
    [HttpGet]
    [Route("Prof/{idProf}")]
    public async Task<IActionResult> GetExercicesByProf(int idProf)
    {
        var exercices = await _envoieExerciceService.GetExercicesByProf(idProf);

        if (exercices == null || exercices.Count == 0)
        {
            return NotFound(); // 404 si aucun exercice trouvé
        }

        return Ok(exercices); // 200 avec la liste des exercices
    }

    // Met à jour un exercice
    [HttpPut]
    [Route("Update")]
    public Task<int> UpdateExercice([FromBody] EnvoieExerciceDto exercice)
    {
        return _envoieExerciceService.UpdateExercice(exercice);
    }

    // Supprime un exercice par son ID
    [HttpDelete]
    [Route("Delete")]
    public Task<int> DeleteExercice([FromBody] int id)
    {
        return _envoieExerciceService.DeleteExercice(id);
    }
}
