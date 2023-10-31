namespace SatisProject.Web.Code
{
    public class Repo
    {
        public static class Session
        {
            public static string? BirimId
            {
                get
                {
                    string birimId = (new HttpContextAccessor()).HttpContext.Session.GetString("BirimId");
                    return birimId;
                }
                set
                {
                    (new HttpContextAccessor()).HttpContext.Session.SetString("BirimId", value ?? "");
                }
            }
            public static string? SirketId
            {
                get
                {
                    string sirketId = (new HttpContextAccessor()).HttpContext.Session.GetString("SirketId");
                    return sirketId;
                }
                set
                {
                    (new HttpContextAccessor()).HttpContext.Session.SetString("SirketId", value ?? "");
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
            public static string? Rol
            {
                get
                {
                    string rol = (new HttpContextAccessor()).HttpContext.Session.GetString("Rol");
                    return rol;
                }
                set
                {
                    (new HttpContextAccessor()).HttpContext.Session.SetString("Rol", value ?? "");
                }
            }
        }
    }
}
