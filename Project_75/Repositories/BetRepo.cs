using Newtonsoft.Json;
using Project_75.HostContexts;
using Project_75.Models;

namespace Project_75.Repositories
{
    public class BetRepo
    {
        public BetContext context;
        public BetRepo(BetContext context)
        {
            this.context = context;
        }
        public IEnumerable<Bet> GetAll() => context.Bets;
        public string Get(int number) {
            return JsonConvert.SerializeObject(context.Bets.Where(bet => bet.Number == number));
        }

    }
}
