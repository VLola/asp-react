using Project_75.HostContexts;
using Project_75.Models;

namespace Project_75.Repositories
{
    public class BetRepo : IRepo<Bet>
    {
        public HostContext context;
        public BetRepo(HostContext context)
        {
            this.context = context;
        }
        public Bet Get(int id) => context.Bets.Find(id);
        public IEnumerable<Bet> GetAll() => context.Bets;
        public IEnumerable<Bet> Find(string symbol) {
            return context.Bets.Where(bet => bet.Symbol == symbol);
        }

    }
}
