using Microsoft.AspNetCore.Mvc;
using System.Collections.ObjectModel;
using System.Threading.Tasks;

public class ParentEleveController : ControllerBase
{
    private readonly IParentEleveService _parentEleveService;

    public ParentEleveController(IParentEleveService parentEleveService)
    {
        _parentEleveService = parentEleveService;
    }

    [HttpPost]
    [Route("ParentEleve/Create")]
    public Task<ParentEleveDto> CreateParentEleve([FromBody] ParentEleveDto parentEleve)
    {
        return _parentEleveService.CreateParentEleve(parentEleve);
    }

    [HttpGet]
    [Route("ParentEleve/Get")]
    public Task<ICollection<ParentEleveDto>> GetParentEleve(int parentid)
    {
        return _parentEleveService.GetParentEleveById(parentid);
    }

    [HttpGet]
    [Route("ParentEleve/GetAll")]
    public Task<ICollection<ParentEleveDto>> GetAllParentEleves()
    {
        return _parentEleveService.GetParentEleves();
    }

    [HttpPut]
    [Route("ParentEleve/Update")]
    public Task<int> UpdateParentEleve([FromBody] ParentEleveDto parentEleve)
    {
        return _parentEleveService.UpdateParentEleve(parentEleve);
    }

    [HttpDelete]
    [Route("ParentEleve/Delete")]
    public Task<int> DeleteParentEleve([FromBody] int id)
    {
        return _parentEleveService.DeleteParentEleve(id);
    }
}
