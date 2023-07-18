namespace Todo.Shared;

public class PageResponse<T> : BaseModel
{
    public List<T>? Data { get; set; }
    public int Page { get; set; }
    public int TotalSize { get; set; }
    public int SizePerPage { get; set; }
}
