namespace Project_75.Models
{
    public class Bet
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Symbol { get; set; }
        public bool IsLong { get; set; }
        public bool IsPositive { get; set; }
        public double OpenPrice { get; set; }
        public double ClosePrice { get; set; }
        public DateTime OpenTime { get; set; }
        public DateTime CloseTime { get; set; }
        public double Profit { get; set; }
        public double StopLoss { get; set; }
        public int Open { get; set; }
        public int Close { get; set; }
        public int Interval { get; set; }
    }
}
