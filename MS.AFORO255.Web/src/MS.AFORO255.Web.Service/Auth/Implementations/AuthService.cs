using Microsoft.Extensions.Configuration;
using MS.AFORO255.Cross.Proxy.Proxy;
using MS.AFORO255.Web.DTO.Auth;
using MS.AFORO255.Web.Service.Auth.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace MS.AFORO255.Web.Service.Auth.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClient _httpClient;
        public AuthService(IConfiguration configuration, IHttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }

        public async Task<AuthDTOResponse> Login(AuthDTORequest authDTORequest)
        {
            string uri = $"{_configuration["Proxy:UrlGateway"]}/token";
            var result = await _httpClient.PostAsync(uri, authDTORequest);
            result.EnsureSuccessStatusCode();

            HttpHeaders headers = result.Headers;
            IEnumerable<string> values;
            string token = "";
            if (headers.TryGetValues("Authorization", out values))
            {
                token = values.First();
            }

            //var data = await result.Content.ReadAsStringAsync();
            //var response = JsonSerializer.Deserialize<ResponseObject<string>>(data);
            //return response.Data;

            return new AuthDTOResponse() { Token = token };
        }
    }
}
