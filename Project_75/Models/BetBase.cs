using CryptoExchange.Net.Converters;
using Newtonsoft.Json;

namespace Project_75.Models
{
    public abstract class BetBase : IBet
    {
        [ArrayProperty(0)]
        public int Number { get; set; }
        [ArrayProperty(1)]
        public string Symbol { get; set; }
        [ArrayProperty(2)]
        public bool IsLong { get; set; }
        [ArrayProperty(3)]
        public bool IsPositive { get; set; }
        [ArrayProperty(4)]
        public decimal OpenPrice { get; set; }
        [ArrayProperty(5)]
        public decimal ClosePrice { get; set; }

        [ArrayProperty(6), JsonConverter(typeof(DateTimeConverter))]
        public DateTime OpenTime { get; set; }
        [ArrayProperty(7), JsonConverter(typeof(DateTimeConverter))]
        public DateTime CloseTime { get; set; }
        [ArrayProperty(8)]
        public decimal Profit { get; set; }
        [ArrayProperty(9)]
        public decimal StopLoss { get; set; }
        [ArrayProperty(10)]
        public int Open { get; set; }
        [ArrayProperty(11)]
        public int Close { get; set; }
        [ArrayProperty(12)]
        public int Interval { get; set; }

    }
}
