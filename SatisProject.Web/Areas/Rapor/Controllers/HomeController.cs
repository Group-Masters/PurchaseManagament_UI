using Microsoft.AspNetCore.Mvc;

namespace SatisProject.Web.Areas.Rapor.Controllers
{
    [Area("Rapor")]
    public class HomeController : Controller
    {
        public IActionResult KullaniciRapor()
        {
            return View();
        }

        public IActionResult BirimRapor()
        {
            return View();
        }

        public IActionResult SirketRapor()
        {
            return View();
        }
        public IActionResult TedarikciRapor()
        {
            return View();
        }
        public IActionResult MalzemeRapor()
        {
            return View();
        }
    }
}
