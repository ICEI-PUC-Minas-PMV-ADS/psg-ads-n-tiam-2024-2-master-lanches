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
        Console.WriteLine("Role definida como admin no ambiente de desenvolvimento.");
    }
    else
    {
        var user = context.User;

        if (user.Identity?.IsAuthenticated == true)
        {
            if (user.IsInRole("admin"))
            {
                context.Items["UserRole"] = "admin";
            }
            else if (user.IsInRole("user"))
            {
                context.Items["UserRole"] = "user";
            }
            else
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Role não autorizada.");
                return;
            }
        }
        else
        {
            // Fallback para desenvolvimento
            context.Items["UserRole"] = "user"; // Ou admin
            Console.WriteLine("Usuário não autenticado. Role padrão definida como 'user'.");
        }
    }

    await _next(context);
}

    }
}