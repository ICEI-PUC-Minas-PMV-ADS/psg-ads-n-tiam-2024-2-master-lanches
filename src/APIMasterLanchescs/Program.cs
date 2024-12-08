using APIMasterLanchescs.Configs.Authentication;
using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Services;
using FirebaseAdmin;
using Google.Api;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configurar o Firebase
        var firebaseConfigPath = builder.Configuration["Firebase:ConfigPath"];
        FirebaseApp firebaseApp = FirebaseApp.Create(new AppOptions
        {
            Credential = GoogleCredential.FromFile(firebaseConfigPath)
        });

        // Configurar serviços
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();

        // Configurar o Swagger com suporte a autenticação JWT
        builder.Services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "API Master Lanches",
                Version = "v1"
            });
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "Insira o token JWT no campo abaixo.",
            });
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

        builder.Services.AddSingleton<FirestoreContext>();
        builder.Services.AddScoped<ProdutoService>();
        builder.Services.AddScoped<UsuarioService>();
        builder.Services.AddScoped<CategoriaService>();
        builder.Services.AddScoped<EstoqueService>();
        builder.Services.AddScoped<PixPaymentService>();
        builder.Services.AddScoped<PedidoService>();
        builder.Services.AddHostedService<SincronizacaoBackgroundService>();

        // Registrar o FirebaseApp como um serviço
        builder.Services.AddSingleton(firebaseApp);

        // Configurar autenticação com Firebase
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddScheme<AuthenticationSchemeOptions, FirebaseAuthenticationHandler>(
                JwtBearerDefaults.AuthenticationScheme, options => { });

        // Configurar autorização com roles
        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("AdminPolicy", policy => policy.RequireRole("admin"));
            options.AddPolicy("UserPolicy", policy => policy.RequireRole("user"));
        });

        // Configurar CORS (política mais restrita recomendada)
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("DefaultPolicy", policy =>
            {
                policy.WithOrigins("https://seusite.com", "http://localhost:3000") // Adicione os domínios permitidos
                      .AllowAnyMethod()
                      .AllowAnyHeader()
                      .AllowCredentials();
            });
        });

        var app = builder.Build();

        // Middleware personalizado para validar roles
        app.UseMiddleware<APIMasterLanchescs.Middlewares.RoleMiddleware>();

        // Configuração do middleware
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        //app.UseHttpsRedirection();

        app.UseRouting();

        app.UseCors("DefaultPolicy"); // Aplicar a política de CORS

        app.UseAuthentication(); // Autenticação antes da autorização
        app.UseAuthorization();


        // Definição do endpoint fora do middleware
        app.MapGet("/user-role", async (context) =>
        {
            if (context.Items.ContainsKey("UserRole"))
            {
                var userRole = context.Items["UserRole"]?.ToString();
                await context.Response.WriteAsJsonAsync(new { userRole });
            }
            else
            {
                context.Response.StatusCode = 401; // Mudança para 401 quando o token é inválido
                await context.Response.WriteAsync("Usuário não autenticado ou role não definida.");
            }
        });


        /* app.UseMiddleware<RoleMiddleware>(); */
        app.MapControllers();

        // Tratamento global de exceções
        app.UseExceptionHandler("/error");
        app.Run();
    }
}
public class SincronizacaoBackgroundService : BackgroundService
{
    private readonly FirestoreContext _firestoreContext;

    public SincronizacaoBackgroundService(FirestoreContext firestoreContext)
    {
        _firestoreContext = firestoreContext;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        TimeSpan intervalo = TimeSpan.FromHours(1);
        while (!stoppingToken.IsCancellationRequested)
        {
            await _firestoreContext.SincronizacaoAutomatica(intervalo, stoppingToken);
        }
    }
}