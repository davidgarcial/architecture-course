using Microsoft.AspNetCore.Identity;

namespace MS.AFORO255.Web.UI.Extensions
{
    public class CustomClaimTypes : IdentityUser
    {
        public const string Token = "Token";
    }
}
