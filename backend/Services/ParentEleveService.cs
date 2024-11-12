
public class ParentEleveService : IParentEleveService
{
    private readonly IParentEleveRepository _parentEleveRepository;

    public ParentEleveService(IParentEleveRepository parentEleveRepository)
    {
        _parentEleveRepository = parentEleveRepository;
    }

    public async Task<ICollection<ParentEleveDto>> GetParentEleves()
    {
        return await _parentEleveRepository.GetParentEleves();
    }

    public async Task<ICollection<ParentEleveDto>> GetParentEleveById(int parentid)
    {
       return await _parentEleveRepository.GetParentEleveById(parentid);
    }

    public async Task<ParentEleveDto> CreateParentEleve(ParentEleveDto parentEleveDto)
    {
        return await _parentEleveRepository.CreateParentEleve(parentEleveDto);
    }

    public async Task<int> UpdateParentEleve(ParentEleveDto parentEleveDto)
    {
        return await _parentEleveRepository.UpdateParentEleve(parentEleveDto);
    }

    public async Task<int> DeleteParentEleve(int id)
    {
        var parentEleveDto = await _parentEleveRepository.GetParentEleveById(id);
        if (parentEleveDto == null)
        {
            throw new KeyNotFoundException("ParentEleve not found");
        }
        return await _parentEleveRepository.DeleteParentEleve(id);
    }
}