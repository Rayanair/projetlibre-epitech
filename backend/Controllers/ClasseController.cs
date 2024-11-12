using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;

public class ClasseController : ControllerBase {
    
    public IClasseService _classeServices;
    public ClasseController(IClasseService classeServices){
        _classeServices = classeServices;
    }

    [HttpPost]
    [Route("Classe/Create")]
    public Task<ClasseDto> CreateClasse([FromBody] ClasseDto classe){
        return _classeServices.CreateClasse(classe);
    }


    [HttpGet]
    [Route("Classe/Get")]
    public Task<ClasseDto> GetClasse(int id){
        return _classeServices.GetClasseById(id);
    }

[HttpGet]
[Route("Classe/{Code}")]
public async Task<IActionResult> GetClasseCode(string Code)
{
    var code = await _classeServices.GetClasseByCode(Code);
    if (code == null)
    {
        return NotFound();
    }
    return Ok(code);
}


    [HttpGet]
    [Route("Classe/GetAll")]
    public Task<ICollection<ClasseDto>> GetAllClasses(){
        return _classeServices.GetClasses();
    }

    [HttpPut]
    [Route("Classe/Update")]
    public Task<int> UpdateClasse([FromBody] ClasseDto classe){
        return _classeServices.UpdateClasse(classe);
    }

    [HttpDelete]
    [Route("Classe/Delete")]
    public Task<int> DeleteClasse([FromBody] int id){
        return _classeServices.DeleteClasse(id);
    }
}