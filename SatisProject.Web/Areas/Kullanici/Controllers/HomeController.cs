using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Kullanici.Controllers
{
    [Area("Kullanici")]
    [AuthActionFilter(Rol ="1,2,3,4,5,6,7,8,9,10")]//Hepsi
    public class HomeController : Controller
    {
        public IActionResult Profil()
        {
            return View();
        }
    }
}
