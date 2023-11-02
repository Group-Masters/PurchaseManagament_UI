using Newtonsoft.Json;
using RestSharp;
using static System.Net.WebRequestMethods;

namespace SatisProject.Web.Code.RestServices
{
    public class RestService : IRestService
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public RestService(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public async Task<RestResponse<TResponse>> PostAsync<TRequest, TResponse>(TRequest requestModel, string endpointUrl, bool tokenRequired = true)
        {
            var apiUrl = "https://localhost:7064/";
            var jsonModel = JsonConvert.SerializeObject(requestModel);

            RestClient restClient = new RestClient(apiUrl);
            RestRequest restRequest = new RestRequest(endpointUrl, Method.Post);

            restRequest.AddParameter("application/json", jsonModel, ParameterType.RequestBody);
            restRequest.AddHeader("Accept", "application/json");


            var response = await restClient.ExecuteAsync<TResponse>(restRequest);
            return response;
        }
    }
}
