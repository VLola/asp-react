using Newtonsoft.Json;
using Project_75.HostContexts;
using Project_75.Models;

namespace Project_75.Repositories
{
    public class BetRepo : IRepo<Bet>
    {
        public BetContext context;
        public BetRepo(BetContext context)
        {
            this.context = context;
        }
        public Bet Get(int id) => context.Bets.Find(id);
        public IEnumerable<Bet> GetAll() => context.Bets;
        public string Find(int number) {
            return JsonConvert.SerializeObject(context.Bets.Where(bet => bet.Number == number));
        }

    }
}
