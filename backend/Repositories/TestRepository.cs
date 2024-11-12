using Microsoft.EntityFrameworkCore;

public class TestRepository : ITestRepository {
    public DbContextProject _dbContext; 
    public TestRepository(DbContextProject dbContext){
        _dbContext = dbContext;
    }
    public async Task<string> GetTestName(){
        var getOne = await _dbContext.Test.SingleOrDefaultAsync(p => p.Id == 1);
        if (getOne == null){
            throw new Exception("Test not found");
        }
        return getOne.Name;

    }
}