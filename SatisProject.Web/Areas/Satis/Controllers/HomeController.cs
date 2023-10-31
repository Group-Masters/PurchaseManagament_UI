using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Satis.Controllers
{
    [Area("Satis")]
    public class HomeController : Controller
    {
        [AuthActionFilter(Rol = "1,2")]
        public IActionResult TeklifOlustur()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,8")]
        public IActionResult TeklifOnayYonetim()
        {
            return View();
        }
        [AuthActionFilter(Rol = "1,9")]
        public IActionResult TeklifOnayKurul()
        {
            return View();
        }
        public IActionResult SatinAlmaTalep()
        {
            return View();
        }

        [AuthActionFilter(Rol = "1,3")]
        public IActionResult SatinAlmaTalepOnay()
        {
            return View();
        }
    }
}
