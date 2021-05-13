using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MS.AFORO255.Web.DTO.History;
using MS.AFORO255.Web.Service.History.Interfaces;
using MS.AFORO255.Web.UI.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MS.AFORO255.Web.UI.Controllers
{
    [Authorize]
    public class HistoryController : Controller
    {
        private readonly IHistoryService _historyService;

        public HistoryController(IHistoryService historyService)
        {
            _historyService = historyService;
        }

        public async Task<IActionResult> Index(int accountId)
        {
            List<HistoryDTOResponse> historyDTOResponses = await _historyService.GetByAccountId(User.Identity.GetToken(), accountId);
            return View(historyDTOResponses);
        }
    }
}
