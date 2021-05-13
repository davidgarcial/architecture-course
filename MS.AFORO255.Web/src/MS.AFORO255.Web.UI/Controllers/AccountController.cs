using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MS.AFORO255.Web.DTO.Account;
using MS.AFORO255.Web.Service.Account.Interfaces;
using MS.AFORO255.Web.UI.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MS.AFORO255.Web.UI.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        public async Task<IActionResult> Index()
        {
            List<AccountDTOResponse> accountDTOResponses = await _accountService.Get(User.Identity.GetToken());
            return View(accountDTOResponses);
        }
    }
}
