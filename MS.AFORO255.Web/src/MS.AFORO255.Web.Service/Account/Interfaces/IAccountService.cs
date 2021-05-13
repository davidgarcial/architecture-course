using MS.AFORO255.Web.DTO.Account;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MS.AFORO255.Web.Service.Account.Interfaces
{
    public interface IAccountService
    {
        Task<List<AccountDTOResponse>> Get(string token);
    }
}
