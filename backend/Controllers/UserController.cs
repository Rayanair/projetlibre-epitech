using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc;

public class UserController : ControllerBase {
    
    public IUserService _userServices;
    public UserController(IUserService userServices){
        _userServices = userServices;
    }

    [HttpPost]
    [Route("User/Create")]
    public Task<UserDto> CreateUser([FromBody] UserDto user){
        return _userServices.CreateUser(user);
    }

    [HttpPost]
    [Route("User/Login")]
    public Task<UserDto> Login([FromBody] MailPasswordDto mailPassword){
        return _userServices.GetUserByEmail(mailPassword);
    }

    [HttpGet]
    [Route("User/Get")]
    public Task<UserDto> GetUser(int id){
        return _userServices.GetUserById(id);
    }

    [HttpGet]
[Route("User/{Code}")]
public async Task<IActionResult> GetUserCode(string Code)
{
    var code = await _userServices.GetUserByCode(Code);
    if (code == null)
    {
        return NotFound();
    }
    return Ok(code);
}

[HttpGet]
[Route("User/Classe/{Classe}")]
public async Task<IActionResult> GetUserClasse(string Classe)
{
    var classe = await _userServices.GetUserByClasse(Classe);

    if (classe == null || classe.Count == 0)
    {
        return NotFound(); // Retourne un 404 si la liste est vide ou nulle
    }

    return Ok(classe); // Retourne un 200 avec la liste des utilisateurs
}

    [HttpGet]
    [Route("User/GetAll")]
    public Task<ICollection<UserDto>> GetAllUsers(){
        return _userServices.GetUsers();
    }

    [HttpPut]
    [Route("User/Update")]
    public Task<int> UpdateUser([FromBody] UserDto user){
        return _userServices.UpdateUser(user);
    }

    [HttpDelete]
    [Route("User/Delete")]
    public Task<int> DeleteUser([FromBody] int id){
        return _userServices.DeleteUser(id);
    }
}