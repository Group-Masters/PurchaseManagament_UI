using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Admin.Controllers
{
    [Area("Admin")]
    //[AuthActionFilter]
    public class HomeController : Controller
    {
        [AuthActionFilter]
        public IActionResult Index()
        {
            return View();
        }
        //[AuthActionFilter(Rol = "1")]
        public IActionResult Rol()
        {
            return View();
        }
        //[AuthActionFilter(Rol = "1,9")]
        public IActionResult KullaniciRol()
        {
            return View();
        }
        //[AuthActionFilter(Rol = "1,9")]
        public IActionResult Kullanici()
        {
            return View();
        }
        //[AuthActionFilter(Rol = "1")]
        public IActionResult Sirket()
        {
            return View();
        }
        //[AuthActionFilter(Rol = "1")]
        public IActionResult Birim()
        {
            return View();
        }

        public IActionResult BirimSirket()
        {
            return View();
        }

        
        // Currency Page --> Para birim sayfa
        public IActionResult ParaBirim()
        {
            return View();
        }
    }
}
