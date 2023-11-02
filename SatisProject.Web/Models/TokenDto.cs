namespace SatisProject.Web.Models
{
    public class TokenDto
    {
        public Int64 Id { get; set; }
        public Int64 CompanyId { get; set; }
        public Int64 DepartmentId { get; set; }
        public List<Int64> RolId { get; set; }
        public string Token { get; set; }
    }
}
