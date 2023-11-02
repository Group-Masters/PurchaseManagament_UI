using Newtonsoft.Json.Linq;
using RestSharp;
using RestSharp.Serializers.Json;
using SatisProject.Web.Models;
using System.Text.Json;

namespace SatisProject.Web.Code.Rest
{
    public class UserRestClient : BaseRestClient
    {
        public dynamic Login(string ePosta, string sifre)
        {

            RestRequest req = new RestRequest("/Employee/Login", Method.Post);
            req.AddJsonBody(new LoginVM 
            {
                UsernameOrEmail = ePosta,
                Password = sifre
            });

            RestResponse resp = client.Post(req);
            string msg = resp.Content.ToString();
            dynamic result = JObject.Parse(msg);
            return result;
        }
    }
}
