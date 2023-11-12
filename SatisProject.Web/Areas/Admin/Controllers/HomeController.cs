using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Admin.Controllers
{
    [Area("Admin")]
    [AuthActionFilter]
    public class HomeController : Controller
    {
        [AuthActionFilter(Rol = "1,2,3,4,5,6,7,8,9,10")]//Hepsi
        public IActionResult Index()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1")]//Admin
        public IActionResult Rol()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,8")]//Admin-Baskan
        public IActionResult KullaniciRol()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,8")]//Admin-Baskan
        public IActionResult Kullanici()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1")]//Admin
        public IActionResult Sirket()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1")]//Admin
        public IActionResult Birim()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1")]//Admin
        public IActionResult BirimSirket()
        {
            return View();
        }

        [AuthActionFilter(Rol = "1")]//Admin
        public IActionResult ParaBirim()
        {
            return View();
        }

        [AuthActionFilter(Rol = "1,2,7,8")]//Admin,Satın Alma,G.Müdür,Baskan
        public IActionResult Tedarikciler()
        {
            return View();
        }

        [AuthActionFilter(Rol = "1")]//Admin
        public IActionResult AdetBirim()
        {
            return View();
        }

    }
}
