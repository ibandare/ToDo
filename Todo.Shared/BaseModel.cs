using System.Reflection;
using System.Text;

namespace Todo.Shared;

public class BaseModel
{
    public override string? ToString()
    {
        Type type = this.GetType();

        StringBuilder sb = new();

        sb.Append(type.Name);
        sb.Append(" {");

        PropertyInfo[] properties = type.GetProperties();

        for (int i = 0; i < properties.Length; i++)
        {
            PropertyInfo property = properties[i];

            sb.Append(property.Name);
            sb.Append(" = ");

            object? value = property.GetValue(this);

            if (value != null)
            {
                sb.Append(value.ToString());
            }
            else
            {
                sb.Append("null");
            }

            if (i < properties.Length - 1)
            {
                sb.Append(", ");
            }
        }

        sb.Append('}');

        return sb.ToString();
    }

}
