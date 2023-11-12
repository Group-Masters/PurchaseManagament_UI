using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Rapor.Controllers
{
    [Area("Rapor")]
    [AuthActionFilter]
    public class HomeController : Controller
    {
        [AuthActionFilter(Rol = "1,8")]//Admin-Baskan
        public IActionResult KullaniciRapor()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,8")]//Admin-Baskan
        public IActionResult BirimRapor()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,8")]//Admin-Baskan
        public IActionResult SirketRapor()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,8")]//Admin-Baskan
        public IActionResult TedarikciRapor()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,8")]//Admin-Baskan
        public IActionResult MalzemeRapor()
        {
            return View();
        }
    }
}
