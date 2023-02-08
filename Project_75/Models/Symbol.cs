namespace Project_75.Models
{
    public class Symbol: SymbolBase
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int Algorithm { get; set; }
        public decimal StopLoss { get; set; }
        public int Time { get; set; }
        public int Interval { get; set; }
        public decimal Profit { get; set; }
        public int Count { get; set; }
        public int CountPlus { get; set; }
        public int CountMinus { get; set; }
        public decimal Win { get; set; }
        public byte[] Chart { get; set; }
    }
}
