using APIMasterLanchescs.Configs.Authentication;
using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Services;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
        builder.Services.AddSwaggerGen();
        builder.Services.AddSingleton<FirestoreContext>();
        builder.Services.AddScoped<ProdutoService>();
        builder.Services.AddScoped<ClienteService>();
        builder.Services.AddScoped<CategoriaService>();

        // Registrar o FirebaseApp como um serviço
        builder.Services.AddSingleton(firebaseApp);

        // Configurar autenticação
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddScheme<AuthenticationSchemeOptions, FirebaseAuthenticationHandler>(
                JwtBearerDefaults.AuthenticationScheme, options => { });

        // Habilitar CORS se necessário
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });

        var app = builder.Build();

        // Configuração do middleware
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseCors("AllowAllOrigins"); // Habilitar CORS

        app.UseAuthentication(); // Autenticação antes da autorização
        app.UseAuthorization();

        app.MapControllers();
        app.Run();
    }
}
