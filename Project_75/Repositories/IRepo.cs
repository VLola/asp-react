namespace Project_75.Repositories
{
    public interface IRepo<T> where T : class
    {
        T Get(int id);
        IEnumerable<T> GetAll();
    }
}
