namespace Project_124.Models
{
    public class JWTTokenResponse
    {
        public string? Token { get; set; }
        public string? Role { get; set; }
        public int Access { get; set; }
    }
}
