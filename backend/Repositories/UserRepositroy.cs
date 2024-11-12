using Microsoft.EntityFrameworkCore;

public class UserRepository(DbContextProject dbContext) : IUserRepository {

    public async Task<ICollection<UserDto>> GetUsers(){
        var users = await dbContext.User.ToListAsync();
        return users.Select(p => new UserDto{
            Id = p.Id,
            FirstName = p.FirstName,
            LastName = p.LastName,
            Email = p.Email,
            Password = p.Password,
            Code = p.Code,
            Avatar = p.Avatar,
            RoleId = p.RoleId,
            ClasseId = p.ClasseId,
            Role = p.Role,
            Classe = p.Classe,
        }).ToList();
    }

    public async Task<UserDto> GetUserById(int id){
        var user = await dbContext.User.SingleOrDefaultAsync(p => p.Id == id);
        if (user == null){
            throw new Exception("User not found");
        }
        return new UserDto{
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Password = user.Password,
            Code = user.Code,
            Avatar = user.Avatar,
            RoleId = user.RoleId,
            ClasseId = user.ClasseId,
            Role = user.Role,
            Classe = user.Classe,
        };
    }

  public async Task<ICollection<UserDto>> GetUserByClasse(string Classe)
{
    // Tente de convertir Classe en un entier nullable
    int? classeId = int.TryParse(Classe, out var id) ? id : (int?)null;

    // Filtre les utilisateurs en comparant les entiers
    var users = await dbContext.User
                               .Where(p => p.ClasseId == classeId)
                               .ToListAsync();

    // Le reste de la méthode reste inchangé
    return users.Select(user => new UserDto
    {
        Id = user.Id,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Email = user.Email,
        Password = user.Password,
        Code = user.Code,
        Avatar = user.Avatar,
        RoleId = user.RoleId,
        ClasseId = user.ClasseId,
        Role = user.Role,
        Classe = user.Classe,
    }).ToList();
}

    public async Task<UserDto> GetUserByCode(string Code){
        var user = await dbContext.User.SingleOrDefaultAsync(p => p.Code == Code);
        if (user == null){
            throw new Exception("User not found");
        }
        return new UserDto{
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Password = user.Password,
            Code = user.Code,
            Avatar = user.Avatar,
            RoleId = user.RoleId,
            ClasseId = user.ClasseId,
            Role = user.Role,
            Classe = user.Classe,
        };
    }

    public async Task<UserDto> CreateUser(UserDto userDto){
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
        var newUser = new User{
            FirstName = userDto.FirstName,
            LastName = userDto.LastName,
            Email = userDto.Email,
            Password = hashedPassword,
            Code = userDto.Code,
            RoleId = userDto.RoleId,
        };
        dbContext.User.Add(newUser);
        await dbContext.SaveChangesAsync();
        return new UserDto{
            Id = newUser.Id,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Email = newUser.Email,
            Password = newUser.Password,
            Code = newUser.Code,
            RoleId = newUser.RoleId,
            ClasseId = newUser.ClasseId,
            Role = newUser.Role,
            Classe = newUser.Classe,
        };
    }

    public async Task<int> UpdateUser(UserDto userDto){
        var user = await dbContext.User.SingleOrDefaultAsync(p => p.Id == userDto.Id);
        if (user == null){
            throw new Exception("User not found");
        }
        user.FirstName = userDto.FirstName;
        user.LastName = userDto.LastName;
        user.Email = userDto.Email;
        user.Password = userDto.Password;
        user.Code = userDto.Code;
        user.Avatar = userDto.Avatar;
        user.RoleId = userDto.RoleId;
        user.ClasseId = userDto.ClasseId;
        await dbContext.SaveChangesAsync();
        return user.Id;
    }

    public async Task<int> DeleteUser(int id){
        var user = await dbContext.User.SingleOrDefaultAsync(p => p.Id == id);
        if (user == null){
            throw new Exception("User not found");
        }
        dbContext.User.Remove(user);
        await dbContext.SaveChangesAsync();
        return user.Id;
    }

    public async Task<UserDto> GetUserByEmail(MailPasswordDto mailPasswordDto)
{
    var user = await dbContext.User.Include(e => e.Role).SingleOrDefaultAsync(p => p.Email == mailPasswordDto.Email);
    
    if (user == null || !BCrypt.Net.BCrypt.Verify(mailPasswordDto.Password, user.Password))
    {
        throw new Exception("Invalid email or password");
    }

    return new UserDto
    {
        Id = user.Id,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Email = user.Email,
        Password = user.Password, // Optionally do not return the password
        Code = user.Code,
        RoleId = user.RoleId,
        ClasseId = user.ClasseId,
        Role = user.Role,
        Classe = user.Classe,
    };
}

}