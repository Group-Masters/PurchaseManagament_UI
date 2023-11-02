namespace SatisProject.Web.Code
{
    public class Repo
    {
        public static class Session
        {
            public static string? CompanyId
            {
                get
                {
                    string companyId = (new HttpContextAccessor()).HttpContext.Session.GetString("CompanyId");
                    return companyId;
                }
                set
                {
                    (new HttpContextAccessor()).HttpContext.Session.SetString("CompanyId", value ?? "");
                }
            }
            public static string? DepartmentId
            {
                get
                {
                    string departmentId = (new HttpContextAccessor()).HttpContext.Session.GetString("DepartmentId");
                    return departmentId;
                }
                set
                {
                    (new HttpContextAccessor()).HttpContext.Session.SetString("DepartmentId", value ?? "");
                }
            }
            public static string? Id
            {
                get
                {
                    string id = (new HttpContextAccessor()).HttpContext.Session.GetString("Id");
                    return id;
                }
                set
                {
                    (new HttpContextAccessor()).HttpContext.Session.SetString("Id", value ?? "");
                }
            }
            public static string? Eposta
            {
                get
                {
                    string ad = new HttpContextAccessor().HttpContext.Session.GetString("Eposta");
                    return ad;
                }
                set
                {
                    new HttpContextAccessor().HttpContext.Session.SetString("Eposta", value ?? "");
                }
            }
            public static string? Token
            {
                get
                {
                    string token = (new HttpContextAccessor()).HttpContext.Session.GetString("Token");
                    return token;
                }
                set
                {
                    (new HttpContextAccessor()).HttpContext.Session.SetString("Token", value ?? "");
                }
            }
            public static string? RolId
            {
                get
                {
                    string rolId = (new HttpContextAccessor()).HttpContext.Session.GetString("RolId");
                    return rolId;
                }
                set
                {
                    (new HttpContextAccessor()).HttpContext.Session.SetString("RolId", value ?? "");
                }
            }
        }
    }
}
