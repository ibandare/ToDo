using System.ComponentModel.DataAnnotations;

namespace ToDo.Api.Models;

public class ToDoPost
{
    [Required] 
    public string? Title { get; set; }
}
