using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Rest;
using SatisProject.Web.Code;
using SatisProject.Web.Models;

namespace SatisProject.Web.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()=>View();

        public IActionResult GirisYap(LoginModel model)
        {

            UserRestClient client = new UserRestClient();
            dynamic result = client.Login(model.Eposta, model.Sifre);

            bool success = result.success;

            if (success)
            {
                Repo.Session.Eposta = model.Eposta;
                Repo.Session.Token = (string)result.data;

                string rolString = string.Join(",", result.rol);
                Repo.Session.Rol = rolString;
                Repo.Session.Id = (string)result.id;
                Repo.Session.SirketId = (string)result.sirketId;
                Repo.Session.BirimId = (string)result.birimId;

                return RedirectToAction("Index", "Admin");
            }
            else
            {
                ViewBag.LoginError = (string)result.message;
                return View("Login");
            }
        }



        public IActionResult CikisYap()
        {
            Repo.Session.Eposta = "";
            Repo.Session.Token = "";
            Repo.Session.Rol = "";
            Repo.Session.Id = "";
            Repo.Session.SirketId = "";

            return RedirectToAction("Login", "Account");
        }
    }
}
