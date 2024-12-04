using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace APIMasterLanchescs.Middlewares
{
    public class RoleMiddleware
    {
        private readonly RequestDelegate _next;

        public RoleMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Host.Host.Contains("ngrok"))
            {
                context.Items["UserRole"] = "admin";
                Console.WriteLine("[DEBUG] Ambiente de desenvolvimento detectado. Role definida como 'admin'.");
            }
            else
            {
                var user = context.User;

                if (user.Identity?.IsAuthenticated == true)
                {
                    var role = user.FindFirstValue(ClaimTypes.Role);

                    if (role == "admin")
                    {
                        context.Items["UserRole"] = "admin";
                    }
                    else if (role == "user")
                    {
                        context.Items["UserRole"] = "user";
                    }
                    else
                    {
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        await context.Response.WriteAsync("Role não autorizada.");
                        return;
                    }
                }
                else
                {
                    Console.WriteLine("[WARNING] Usuário não autenticado.");
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Usuário não autenticado.");
                    return;
                }
            }

            await _next(context);
        }
    }
}