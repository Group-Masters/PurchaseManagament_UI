using Newtonsoft.Json.Linq;
using RestSharp;
using RestSharp.Serializers.Json;
using System.Text.Json;

namespace SatisProject.Web.Code.Rest
{
    public class UserRestClient : BaseRestClient
    {
        public dynamic Login(string ePosta, string sifre)
        {

            RestRequest req = new RestRequest("/Auth/Login", Method.Post);
            req.AddJsonBody(new
            {
                Eposta = ePosta,
                Sifre = sifre
            });

            RestResponse resp = client.Post(req);
            string msg = resp.Content.ToString();
            dynamic result = JObject.Parse(msg);
            return result;
        }
    }
}
