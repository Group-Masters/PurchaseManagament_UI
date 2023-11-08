namespace SatisProject.Web.Models
{
    public class Result<T> where T : new()
    {
        public T data { get; set; }
        public bool Success { get; set; } = true;
        public List<string> Errors { get; set; } = new List<string>();
    }
}
