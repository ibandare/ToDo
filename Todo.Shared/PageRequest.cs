using System.Collections.Generic;

namespace Todo.Shared;

public class PageRequest : BaseModel
{
    public PageRequest()
    {
        
    }
    public int Page { get; set; } = 1;

    public int SizePerPage { get; set; } = int.MaxValue;

    public Direction SortOrder { get; set; } = Direction.Asc;

    public string? SortField { get; set; }

    public Dictionary<String, FilterItem> Filters { get; set; } = new Dictionary<String, FilterItem>();

    public int Skip
    {
        get { return (Page - 1) * SizePerPage; }
    }

}
