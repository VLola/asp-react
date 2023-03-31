﻿using Project_124.Contexts;
using Project_124.Repositories;

namespace Project_124.UnitOfWorks
{
    public class UserWork
    {
        private AzureContext _context = new AzureContext();

        private UserRepo? _repository;

        public UserRepo Repository
        {
            get
            {
                if (_repository == null) _repository = new UserRepo(_context);
                return _repository;
            }
            set { _repository = value; }
        }
        public void Dispose() => GC.SuppressFinalize(this);
    }
}
