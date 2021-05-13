using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MS.AFORO255.Web.DTO.Auth;
using MS.AFORO255.Web.Service.Auth.Interfaces;
using MS.AFORO255.Web.UI.Extensions;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MS.AFORO255.Web.UI.Controllers
{
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            AuthDTORequest authDTORequest = new AuthDTORequest()
            {
                UserName = username,
                Password = password
            };
            AuthDTOResponse authDTOResponse = await _authService.Login(authDTORequest);

            if (string.IsNullOrEmpty(authDTOResponse.Token))
                return View();

            var claims = new List<Claim>();
            claims.Add(new Claim(CustomClaimTypes.Token, authDTOResponse.Token));
            ClaimsIdentity userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
            return RedirectToAction("Index", "Home");
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}
