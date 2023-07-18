using Microsoft.EntityFrameworkCore;
using ToDo.Api.Models;

namespace ToDo.Api.Data;

public class ToDoContext : DbContext
{

    public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
    {
        //Database.EnsureDeleted();
        Database.EnsureCreated();
    }

    public virtual DbSet<ToDoItem> ToDos { get; set; }
}
