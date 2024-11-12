using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;


public class MatiereController : ControllerBase
{
    private readonly IMatiereService _matiereService;

    public MatiereController(IMatiereService matiereService)
    {
        _matiereService = matiereService;
    }

    [HttpPost]
    [Route("Matiere/Create")]
    public Task<MatiereDto> CreateMatiere([FromBody] MatiereDto matiere){
        return _matiereService.CreateMatiere(matiere);
    }


    [HttpGet]
    [Route("Matiere/{UserId}")]
    public async Task<IActionResult> GetMatiereById(int UserId)
    {
        var matiere = await _matiereService.GetMatiereById(UserId);
        if (matiere == null)
        {
            return NotFound();
        }
        return Ok(matiere);
    }

    [HttpGet]
    [Route("Matiere/GetAll")]
    public async Task<IActionResult> GetAllMatieres()
    {
        var matieres = await _matiereService.GetMatieres();
        return Ok(matieres);
    }

    [HttpPut]
    [Route("Matiere/Update")]
    public async Task<IActionResult> UpdateMatiere([FromBody] MatiereDto matiereDto)
    {
        var result = await _matiereService.UpdateMatiere(matiereDto);
        if (result == 0)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete]
    [Route("Matiere/Delete/{id}")]
    public async Task<IActionResult> DeleteMatiere(int id)
    {
        var result = await _matiereService.DeleteMatiere(id);
        if (result == 0)
        {
            return NotFound();
        }
        return NoContent();
    }
}