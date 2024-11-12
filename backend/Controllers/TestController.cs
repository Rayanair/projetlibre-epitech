using Microsoft.AspNetCore.Mvc;

public class TestController : ControllerBase{
    public ITestServices _testServices;
    public TestController(ITestServices testServices){
        _testServices = testServices;
    }

    [HttpGet]
    [Route("Test/Get")]
    public Task<string> GetTestName(){
        return _testServices.GetTestName();
    }
}