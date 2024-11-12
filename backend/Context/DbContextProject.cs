using Microsoft.EntityFrameworkCore;

public class DbContextProject: DbContext {

    public DbSet<Test> Test {get; set;}
    public DbSet<User> User {get; set;}
    public DbSet<Role> Role {get; set;}
    public DbSet<Matieres> Matieres {get; set;}
    public DbSet<Level> Level {get; set;}
    public DbSet<Classe> Classe {get; set;}
    public DbSet<ParentEleve> ParentEleve {get; set;}
    public DbSet<Planning> Planning {get; set;}
    public DbSet<EnvoieExercice> EnvoieExercice {get; set;}
    public DbContextProject(DbContextOptions<DbContextProject> options): base(options){
    }
}