using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ToDo.Api.Models;
using ToDo.Api.Services;

namespace ToDo.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ToDoController : ControllerBase
{
    private readonly IBaseService<ToDoItem> _service;
    private readonly ILogger<ToDoController> _logger;

    public ToDoController(
        IBaseService<ToDoItem> service,
        ILogger<ToDoController> logger)

    {
        _service = service;
        _logger = logger;
    }

    // GET: api/ToDo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ToDoItem>>> GetToDos()
    {
        _logger.LogInformation("GetAll");
        return Ok(await _service.FindAllAsync());
    }

    // GET: api/ToDo/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ToDoItem>> GetToDo(int id)
    {
        _logger.LogInformation("Get {id}", id);

        var toDo = await _service.FindByIdAsync(id);


        if (toDo == null)
        {
            return NotFound();
        }


        return Ok(toDo);

    }

    // PUT: api/ToDo/5
    [HttpPut("{id}")]
    public async Task<ActionResult<ToDoItem>> PutToDo(int id, ToDoItem toDo)
    {
        _logger.LogInformation("Update {title}", toDo.Title);
        if (id != toDo.Id)
        {
            return BadRequest();
        }

        return await _service.UpdateAsync(toDo);



    }

    // POST: api/ToDo
    [HttpPost]
    public async Task<ActionResult<ToDoItem>> PostToDo(ToDoPost post)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        _logger.LogInformation("Create {title} by {userId}", post.Title, userId);
        var toDo = await _service.CreateAsync(new()
        {
            Title = post.Title,
            User = userId,
        });

        return CreatedAtAction(nameof(GetToDo), new { id = toDo.Id }, toDo);


    }

    // DELETE: api/ToDo/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteToDo(int id)
    {
        _logger.LogInformation("Delete {id}", id);


        await _service.RemoveAsync(id);


        return NoContent();
    }
}
