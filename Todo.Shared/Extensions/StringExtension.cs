namespace Todo.Shared.Extensions;

public static class StringExtension
{

    public static string Capitalize(this string input)
    {
        if (string.IsNullOrEmpty(input))
        {
            return input;
        }

        return string.Concat(input[0].ToString().ToUpper(), input.AsSpan(1));
    }
}
