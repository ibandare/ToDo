using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;
using Todo.Shared;
using Todo.Shared.Extensions;
using ToDo.Identity.Data;
using ToDo.Identity.Models;

namespace ToDo.Identity.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    static Expression<Func<T, bool>> BuildContainsExpression<T>(string propertyName, string propertyValue)
    {
        var parameterExp = Expression.Parameter(typeof(T), "x");
        var propertyExp = Expression.Property(parameterExp, propertyName);
        MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
        var someValue = Expression.Constant(propertyValue, typeof(string));
        var containsMethodExp = Expression.Call(propertyExp, method, someValue);

        return Expression.Lambda<Func<T, bool>>(containsMethodExp, parameterExp);
    }

    public async Task<PageResponse<User>> FindAllAsync(PageRequest pageRequest)
    {
        Expression<Func<ApplicationUser, object>> keySelector = x => EF.Property<ApplicationUser>(x, pageRequest.SortField.Capitalize() ?? "Id");

        var query = _context.Users
            .Skip(pageRequest.Skip)
            .Take(pageRequest.SizePerPage);
        query = pageRequest.SortOrder != Direction.Asc ? query.OrderByDescending(keySelector) : query.OrderBy(keySelector);

        foreach (var filter in pageRequest.Filters!)
        {
            query = query.Where(BuildContainsExpression<ApplicationUser>(filter.Key, filter.Value.FilterVal));
        }


        return new PageResponse<User>
        {
            Data = await query.Select(user => new User
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email
            }).ToListAsync(),
            TotalSize = query.Count(),
            Page = pageRequest.Page,
            SizePerPage = pageRequest.SizePerPage
        };
    }
}
