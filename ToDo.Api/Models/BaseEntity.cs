using System.ComponentModel.DataAnnotations;
using Todo.Shared;

namespace ToDo.Api.Models;

public abstract class BaseEntity : BaseModel
{
    [Key]
    public int Id { get; set; }

    [Timestamp]
    public byte[]? RowVersion { get; set; }

}
