using CryptoExchange.Net.Converters;
using Newtonsoft.Json;

namespace Project_75.Models
{
    [JsonConverter(typeof(ArrayConverter))]
    public class Bet: BetBase
    {
        public int Id { get; set; }
    }
}
