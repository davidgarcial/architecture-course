using Microsoft.AspNetCore.Mvc;
using MS.AFORO255.Security.Services;
using Microsoft.Extensions.Options;
using Aforo255.Cross.Token.Src;
using MS.AFORO255.Security.DTOs;
using Microsoft.Extensions.Logging;

namespace MS.AFORO255.Security.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAccessService _accessService;
        private readonly ILogger<AuthController> _log;
        private readonly JwtOptions _jwtOption;

        public AuthController(IAccessService accessService, IOptionsSnapshot<JwtOptions> jwtOption,
            ILogger<AuthController> log)
        {
            _accessService = accessService;
            _log = log;
            _jwtOption = jwtOption.Value;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _log.LogInformation("Get AuthController");

            return Ok(_accessService.GetAll());
        }

        [HttpPost]
        public IActionResult Post([FromBody] AuthRequest request)
        {
            _log.LogInformation("Post AuthController");

            if (!_accessService.Validate(request.UserName, request.Password))
            {
                return Unauthorized();
            }

            Response.Headers.Add("access-control-expose-headers", "Authorization");
            Response.Headers.Add("Authorization", JwtToken.Create(_jwtOption));

            return Ok();
        }


    }
}
