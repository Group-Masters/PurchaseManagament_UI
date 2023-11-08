using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Rest;
using SatisProject.Web.Code;
using SatisProject.Web.Models;
using SatisProject.Web.Code.RestServices;
using System.Reflection;

namespace SatisProject.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly IRestService _restService;

        public AccountController(IRestService restService)
        {
            _restService = restService;
        }

        public IActionResult Login()=>View();
        public  IActionResult LoginDogrulama()=>View();
        public async Task<IActionResult> LoginDogrulamaGonder(LoginVM2 model)
        {
            var response = await _restService.PostAsync<LoginVM2, Result<TokenDto>>(model, "Employee/Login2FK", false);
            if(response.Data.Success == null)
            {
                List<string> errors = (List<string>)response.Data.Errors;
                ViewBag.LoginErrors = errors;
                return View("Login", "Account");
            }
            if (response.Data.Success)
            {
                var item = response.Data.data;
                Repo.Session.Eposta = model.UsernameOrEmail;
                Repo.Session.Token = item.Token;

                //List<long> rolIdList = item.RolId;
                //string.Join(",", rolIdList.Select(id => id.ToString()));

                // string rolString = string.Join(",", Convert.ToString(item.RolId.Select(x=>x.ToString())));
                List<long> rolIdList = item.RolId; // Örneğin, item.RolId listesi
                List<string> stringList = rolIdList.Select(id => id.ToString()).ToList();
                string rolString = string.Join(",", stringList);
                Repo.Session.RolId = rolString;
                Repo.Session.Id = Convert.ToString(item.Id);
                Repo.Session.CompanyId = Convert.ToString(item.CompanyId);
                Repo.Session.DepartmentId = Convert.ToString(item.CompanyId);

                return RedirectToAction("index", "admin");
            }
            else
            {
                //ViewBag.LoginError = Convert.ToString(response.Data.Errors);
                List<string> errors = (List<string>)response.Data.Errors;
                ViewBag.LoginErrors = errors;
                //return View("Login");
                return View("LoginDogrulama", "Account");
            }
          
        }

        public async Task<IActionResult> GirisYap(LoginVM model)
        {

            var response = await _restService.PostAsync<LoginVM, Result<bool>>(model, "Employee/Login", false);
            //UserRestClient client = new UserRestClient();
            //dynamic result = client.Login(model.UsernameOrEmail, model.Password);

            //bool success = result.success;
            
            if (response.Data.Success==true)
            {
                //var item = response.Data.Data;
                Repo.Session.Eposta = model.UsernameOrEmail;
                //Repo.Session.Token = item.Token;

                ////List<long> rolIdList = item.RolId;
                ////string.Join(",", rolIdList.Select(id => id.ToString()));

                //// string rolString = string.Join(",", Convert.ToString(item.RolId.Select(x=>x.ToString())));
                //List<long> rolIdList = item.RolId; // Örneğin, item.RolId listesi
                //List<string> stringList = rolIdList.Select(id => id.ToString()).ToList();
                //string rolString = string.Join(",", stringList);
                //Repo.Session.RolId = rolString;
                //Repo.Session.Id = Convert.ToString(item.Id);
                //Repo.Session.CompanyId = Convert.ToString(item.CompanyId);
                //Repo.Session.DepartmentId = Convert.ToString(item.CompanyId);

                return RedirectToAction("LoginDogrulama", "Account");
            }
            else
            {
                //ViewBag.LoginError = Convert.ToString(response.Data.Errors);
                List<string> errors = (List<string>)response.Data.Errors;
                ViewBag.LoginErrors = errors;
                return View("Login");
            }
        }

        public IActionResult CikisYap()
        {
            Repo.Session.Eposta = "";
            Repo.Session.Token = "";
            Repo.Session.RolId = "";
            Repo.Session.Id = "";
            Repo.Session.CompanyId = "";
            Repo.Session.DepartmentId = "";

            return RedirectToAction("Login", "Account");
        }
    }
}
