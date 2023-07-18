using ToDo.Api.Models;

namespace ToDo.Api.Services;

public interface IBaseService<T> where T : BaseEntity
{
    Task<ToDoItem> CreateAsync(ToDoItem todo);
    Task<List<ToDoItem>> FindAllAsync();
    Task<ToDoItem?> FindByIdAsync(int id);
    Task RemoveAsync(int id);
    Task<ToDoItem> UpdateAsync(ToDoItem todo);
}
