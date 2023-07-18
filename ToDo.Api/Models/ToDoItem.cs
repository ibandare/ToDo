using System.ComponentModel.DataAnnotations;

namespace ToDo.Api.Models;

public class ToDoItem : BaseEntity
{

    [Required]
    public string? Title { get; set; }

    [Required]
    public string? User { get; set; }

}
