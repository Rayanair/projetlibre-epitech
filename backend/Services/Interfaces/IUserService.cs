public interface IUserService {
    Task<ICollection<UserDto>> GetUsers();
    Task<UserDto> GetUserById(int id);
    Task<UserDto> GetUserByCode(string Code);
    Task<ICollection<UserDto>> GetUserByClasse(string Classe);
    Task<UserDto> CreateUser(UserDto user);
    Task<int> UpdateUser(UserDto user);
    Task<int> DeleteUser(int id);
    Task<UserDto> GetUserByEmail(MailPasswordDto mailPasswordDto);
}