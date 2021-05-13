using Microsoft.Extensions.Configuration;
using MS.AFORO255.Cross.Proxy.Proxy;
using MS.AFORO255.Web.DTO.Account;
using MS.AFORO255.Web.Service.Account.Interfaces;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MS.AFORO255.Web.Service.Account.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClient _httpClient;
        public AccountService
            (IConfiguration configuration, IHttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }

        public async Task<List<AccountDTOResponse>> Get(string token)
        {
            string uri = $"{_configuration["Proxy:UrlGateway"]}/account";
            var result = await _httpClient.GetStringAsync(uri, authorizationToken: token);
            var response = JsonConvert.DeserializeObject<List<AccountDTOResponse>>(result);
            return response;
        }
    }
}
