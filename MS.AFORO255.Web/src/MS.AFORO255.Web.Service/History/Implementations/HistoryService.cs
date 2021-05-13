using Microsoft.Extensions.Configuration;
using MS.AFORO255.Cross.Proxy.Proxy;
using MS.AFORO255.Web.DTO.History;
using MS.AFORO255.Web.Service.History.Interfaces;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MS.AFORO255.Web.Service.History.Implementations
{
    public class HistoryService : IHistoryService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClient _httpClient;
        public HistoryService(IConfiguration configuration, IHttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }
        public async Task<List<HistoryDTOResponse>> GetByAccountId(string token, int accountId)
        {
            string uri = $"{_configuration["Proxy:UrlGateway"]}/history/{accountId}";
            var result = await _httpClient.GetStringAsync(uri, authorizationToken: token);
            var response = JsonConvert.DeserializeObject<List<HistoryDTOResponse>>(result);
            return response;
        }
    }
}
