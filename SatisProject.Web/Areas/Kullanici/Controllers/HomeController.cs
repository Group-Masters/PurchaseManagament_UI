using Microsoft.AspNetCore.Mvc;

namespace SatisProject.Web.Areas.Kullanici.Controllers
{
    [Area("Kullanici")]
    public class HomeController : Controller
    {
        public IActionResult Profil()
        {
            return View();
        }
    }
}
