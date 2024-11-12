using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;


public class LevelController : ControllerBase
{
    private readonly ILevelService _levelService;

    public LevelController(ILevelService levelService)
    {
        _levelService = levelService;
    }

    [HttpPost]
    [Route("Level/Create")]
    public Task<LevelDto> CreateLevel([FromBody] LevelDto level){
        return _levelService.CreateLevel(level);
    }


    [HttpGet]
    [Route("Level/{UserId}")]
    public async Task<IActionResult> GetLevelById(int UserId)
    {
        var level = await _levelService.GetLevelById(UserId);
        if (level == null)
        {
            return NotFound();
        }
        return Ok(level);
    }

    [HttpGet]
    [Route("Level/GetAll")]
    public async Task<IActionResult> GetAllLevel()
    {
        var levels = await _levelService.GetLevel();
        return Ok(levels);
    }

    // [HttpPut]
    // [Route("Level/Update")]
    // public async Task<IActionResult> UpdateLevel([FromBody] LevelDto levelDto)
    // {
    //     var result = await _levelService.UpdateLevel(levelDto);
    //     if (result == 0)
    //     {
    //         return NotFound();
    //     }
    //     return NoContent();
    // }

    [HttpDelete]
    [Route("Level/Delete/{id}")]
    public async Task<IActionResult> DeleteLevel(int id)
    {
        var result = await _levelService.DeleteLevel(id);
        if (result == 0)
        {
            return NotFound();
        }
        return NoContent();
    }
}