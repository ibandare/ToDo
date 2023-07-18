using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Todo.Shared;
using ToDo.Identity.Models;
using ToDo.Identity.Services;
using static Duende.IdentityServer.IdentityServerConstants;

namespace ToDo.Api.Controllers;

[Route("api/[controller]")]
[Authorize(LocalApi.PolicyName)]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UserController> _logger;

    public UserController(IUserService userService, ILogger<UserController> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<PageResponse<User>>> FindAll([FromQuery] PageRequest pageRequest)
    {
        _logger.LogInformation("GetAll: {pageRequest}", pageRequest);
        PageResponse<User> users = await _userService.FindAllAsync(pageRequest);
        return Ok(users);
    }

}
