public interface IParentEleveService
{
    Task<ICollection<ParentEleveDto>> GetParentEleves();
    Task<ICollection<ParentEleveDto>> GetParentEleveById(int parentid);
    Task<ParentEleveDto> CreateParentEleve(ParentEleveDto parentEleveDto);
    Task<int> UpdateParentEleve(ParentEleveDto parentEleveDto);
    Task<int> DeleteParentEleve(int id);
}