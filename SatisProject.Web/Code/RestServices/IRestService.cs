using RestSharp;

namespace SatisProject.Web.Code.RestServices
{
    public interface IRestService
    {
        Task<RestResponse<TResponse>> PostAsync<TRequest, TResponse>(TRequest requestModel, string endpointUrl, bool tokenRequired = true);
    }
}
