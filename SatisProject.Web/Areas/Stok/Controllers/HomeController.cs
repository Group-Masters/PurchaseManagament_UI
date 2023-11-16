using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Stok.Controllers
{
    [Area("Stok")]
    [AuthActionFilter]
    public class HomeController : Controller
    {
        [AuthActionFilter(Rol = "1,2,9")]//Admin,Satın Alma,Stok Sorumlusu
        public IActionResult Urun()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,2,9")]//Admin,Satın Alma,Stok Sorumlusu
        public IActionResult DepoStok()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,2,9")]//Admin,Satın Alma,Stok Sorumlusu
        public IActionResult StokIslem()
        {
            return View();
        }
        [AuthActionFilter(Rol = "2")]//Satın Alma
        public IActionResult StokSatinAlma()
        {
            return View();
        }
    }
}
