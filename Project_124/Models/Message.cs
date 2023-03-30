namespace Project_124.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime DateTime { get; set; }
        public string Question { get; set; }
        public string Response { get; set; }
    }
}
