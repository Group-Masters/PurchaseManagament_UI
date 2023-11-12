using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Stok.Controllers
{
    [Area("Stok")]
    [AuthActionFilter(Rol = "1,2,9")]//Admin,Satın Alma,Stok Sorumlusu
    public class HomeController : Controller
    {
        public IActionResult Urun()
        {
            return View();
        }
        public IActionResult DepoStok()
        {
            return View();
        }

        public IActionResult StokIslem()
        {
            return View();
        }
    }
}
