namespace Project_124.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
        public string Role { get; set; } = String.Empty;
        public int Access { get; set; }
    }
}
