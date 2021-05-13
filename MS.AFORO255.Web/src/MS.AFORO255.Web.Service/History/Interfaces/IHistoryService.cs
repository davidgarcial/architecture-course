using MS.AFORO255.Web.DTO.History;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MS.AFORO255.Web.Service.History.Interfaces
{
    public interface IHistoryService
    {
        Task<List<HistoryDTOResponse>> GetByAccountId(string token, int accountId);
    }
}
