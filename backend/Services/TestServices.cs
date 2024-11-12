public class TestServices : ITestServices{
    public ITestRepository _testRepository;
    public TestServices(ITestRepository testRepository){
        _testRepository = testRepository;

    }
    public Task<string> GetTestName(){
        return _testRepository.GetTestName();
    }
}