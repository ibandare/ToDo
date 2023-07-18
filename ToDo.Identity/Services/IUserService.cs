using Todo.Shared;
using ToDo.Identity.Models;

namespace ToDo.Identity.Services;

public interface IUserService
{
    Task<PageResponse<User>> FindAllAsync(PageRequest pageRequest);
}
