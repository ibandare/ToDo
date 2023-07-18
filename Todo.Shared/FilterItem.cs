namespace Todo.Shared;

public class FilterItem : BaseModel
{
    public string? FilterVal { get; set; }
    public string? Comparator { get; set; }
}