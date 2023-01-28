namespace Project_75.Models
{
    public interface IBet
    {
        int Number { get; set; }
        string Symbol { get; set; }
        bool IsLong { get; set; }
        bool IsPositive { get; set; }
        decimal OpenPrice { get; set; }
        decimal ClosePrice { get; set; }
        DateTime OpenTime { get; set; }
        DateTime CloseTime { get; set; }
        decimal Profit { get; set; }
        decimal StopLoss { get; set; }
        int Open { get; set; }
        int Close { get; set; }
        int Interval { get; set; }
    }
}
