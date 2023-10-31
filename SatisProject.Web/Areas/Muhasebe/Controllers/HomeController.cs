using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Muhasebe.Controllers
{
    [Area("Muhasebe")]
    public class HomeController : Controller
    {
        [AuthActionFilter(Rol = "1,7,9")]
        public IActionResult Faturalandirma()
        {
            return View();
        }
    }
}
