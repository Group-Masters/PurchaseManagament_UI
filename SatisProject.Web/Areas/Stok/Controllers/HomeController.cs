using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Stok.Controllers
{
    [Area("Stok")]
    public class HomeController : Controller
    {
        //[AuthActionFilter(Rol = "1,2,10")]
        public IActionResult Urun()
        {
            return View();
        }
        //[AuthActionFilter(Rol = "1,2,10")]
        public IActionResult DepoStok()
        {
            return View();
        }
    }
}
