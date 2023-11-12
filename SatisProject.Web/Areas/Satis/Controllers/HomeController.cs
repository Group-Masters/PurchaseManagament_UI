using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Satis.Controllers
{
    [Area("Satis")]
    [AuthActionFilter]
    public class HomeController : Controller
    {
        [AuthActionFilter(Rol = "1,2")]//Admin- Satın Alma
        public IActionResult TeklifOlustur()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,7")]//Admin- G.Müdür
        public IActionResult TeklifOnayYonetim()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,8")]//Admin- Baskan
        public IActionResult TeklifOnayKurul()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,4,7,8")]//Admin,Talep,G.Müdür,Baskan
        public IActionResult SatinAlmaTalep()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,3")]//Admin,Onay
        public IActionResult SatinAlmaTalepOnay()
        {
            return View();
        }
    }
}
