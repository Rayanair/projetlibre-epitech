public class UserService : IUserService
{
    public IUserRepository _userRepository;
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public Task<ICollection<UserDto>> GetUsers()
    {
        return _userRepository.GetUsers();
    }

    public Task<UserDto> GetUserById(int id)
    {
        return _userRepository.GetUserById(id);
    }

    public Task<UserDto> GetUserByCode(string Code)
    {
        return _userRepository.GetUserByCode(Code);
    }

  public Task<ICollection<UserDto>> GetUserByClasse(string Classe)
{
    return _userRepository.GetUserByClasse(Classe);
}

    public Task<UserDto> GetUserByEmail(MailPasswordDto mailPasswordDto)
    {
        return _userRepository.GetUserByEmail(mailPasswordDto);
    }

    public Task<UserDto> CreateUser(UserDto user)
    {
        return _userRepository.CreateUser(user);
    }

    public Task<int> UpdateUser(UserDto user)
    {
        return _userRepository.UpdateUser(user);
    }

    public Task<int> DeleteUser(int id)
    {
        return _userRepository.DeleteUser(id);
    }
}