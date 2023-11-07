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
    }
}
