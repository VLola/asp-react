﻿using Project_75.HostContexts;
using Project_75.Models;

namespace Project_75.Repositories
{
    public class SymbolRepo : IRepo<Symbol>
    {
        public SymbolContext context;
        public SymbolRepo(SymbolContext context)
        {
            this.context = context;
        }
        public Symbol Get(int id) => context.Symbols.Find(id);
        public IEnumerable<Symbol> GetAll() => context.Symbols;
        public IEnumerable<Symbol> Find()
        {
            return context.Symbols.Where(symbol => symbol.Profit > 0m).OrderByDescending(symbol => symbol.Profit);
        }
    }
}
