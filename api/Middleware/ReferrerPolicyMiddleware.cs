

public class ReferrerPolicyMiddleware
{
    private readonly RequestDelegate _next;

    public ReferrerPolicyMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        var origin = context.Request.Headers["Origin"].ToString();

        if (context.Response.Headers["Referrer-Policy"].Count == 0)
        {
            // Set Referrer-Policy header based on origin
            var referrerPolicy = origin != "" ? "strict-origin-when-cross-origin" : "no-referrer";
            context.Response.Headers.Add("Referrer-Policy", referrerPolicy);
        }

        await _next(context);
    }
}

public static class ReferrerPolicyMiddlewareExtensions
{
    public static IApplicationBuilder UseReferrerPolicy(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ReferrerPolicyMiddleware>();
    }
}
