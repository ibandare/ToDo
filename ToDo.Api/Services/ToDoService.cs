using Microsoft.EntityFrameworkCore;
using ToDo.Api.Data;
using ToDo.Api.Models;

namespace ToDo.Api.Services;

public class ToDoService : IBaseService<ToDoItem>
{
    private readonly ToDoContext _context;

    public ToDoService(ToDoContext context)
    {
        _context = context;
    }

    public Task<List<ToDoItem>> FindAllAsync()
    {
        return _context.ToDos
             .OrderBy(todo => todo.Id)
             //.Where(predicate)
             //.Skip(0)
             //.Take(10)
             .ToListAsync();
    }

    public async Task<ToDoItem> CreateAsync(ToDoItem todo)
    {
        _context.ToDos.Add(todo);
        await _context.SaveChangesAsync();
        return todo;
    }

    public async Task<ToDoItem> UpdateAsync(ToDoItem todo)
    {
        _context.Entry(todo).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return todo;
    }


    public Task<ToDoItem?> FindByIdAsync(int id)
    {
        return _context.ToDos.FindAsync(id).AsTask();
    }

    public async Task RemoveAsync(int id)
    {
        var item = await _context.ToDos.FindAsync(id);
        _context.ToDos.Remove(item);

        await _context.SaveChangesAsync();
    }
}

