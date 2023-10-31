using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SatisProject.Web.Code.Filters
{
    public class AuthActionFilter : ActionFilterAttribute, IAuthorizationFilter
    {
        public string Rol;

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!string.IsNullOrEmpty(Rol))
            {
                if (!string.IsNullOrEmpty(Repo.Session.Rol))
                {
                    var requiredRoles = Rol.Split(',').Select(r => r.Trim()).ToList();
                    var userRoles = Repo.Session.Rol.Split(',').Select(r => r.Trim()).ToList();

                    bool isAuthorized = requiredRoles.Any(role => userRoles.Contains(role));

                    if (!isAuthorized)
                    {
                        context.Result = new UnauthorizedResult();
                    }
                }
                else
                {
                    context.Result = new UnauthorizedResult();
                }
            }
        }


        /*
         * Action çalışmadan önce
         */
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
        }
        /*
         * Action çalıştıktan sonra
         */
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);
        }
        /*
         * Tam response'u kullanıcıya göndermeden önce çalıştırılır
         */
        public override void OnResultExecuting(ResultExecutingContext context)
        {
            base.OnResultExecuting(context);
        }
        /*
         * Sonucu gönderdik ve bu metod çalışıyor
         */
        public override void OnResultExecuted(ResultExecutedContext context)
        {
            base.OnResultExecuted(context);
        }
    }
}
