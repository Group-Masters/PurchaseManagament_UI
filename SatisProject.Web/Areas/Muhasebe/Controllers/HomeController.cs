using Microsoft.AspNetCore.Mvc;
using SatisProject.Web.Code.Filters;

namespace SatisProject.Web.Areas.Muhasebe.Controllers
{
    [Area("Muhasebe")]
    [AuthActionFilter]
    public class HomeController : Controller
    {
        [AuthActionFilter(Rol = "1,6,7,8")]//Admin,Muhasebe,G.Müdür,Baskan
        public IActionResult Faturalandirma()
        {
            return View();
        }
    }
}
