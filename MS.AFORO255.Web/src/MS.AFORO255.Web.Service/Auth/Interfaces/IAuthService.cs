using MS.AFORO255.Web.DTO.Auth;
using System.Threading.Tasks;

namespace MS.AFORO255.Web.Service.Auth.Interfaces
{
    public interface IAuthService
    {
        Task<AuthDTOResponse> Login(AuthDTORequest authDTORequest);
    }
}
