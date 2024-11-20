using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace APIMasterLanchescs.Configs.Authentication
{
    public class FirebaseAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly FirebaseApp _firebaseApp;

        public FirebaseAuthenticationHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            FirebaseApp firebaseApp)
            : base(options, logger, encoder, clock)
        {
            _firebaseApp = firebaseApp ?? throw new ArgumentNullException(nameof(firebaseApp));
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Context.Request.Headers.TryGetValue("Authorization", out var authorizationHeader))
                return AuthenticateResult.NoResult();

            var bearerToken = authorizationHeader.ToString();

            if (!bearerToken.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                return AuthenticateResult.Fail("Invalid Authorization header.");

            var token = bearerToken.Substring("Bearer ".Length).Trim();

            try
            {
                var firebaseToken = await FirebaseAuth.GetAuth(_firebaseApp).VerifyIdTokenAsync(token);

                var claims = firebaseToken.Claims.Select(c => new Claim(c.Key, c.Value.ToString() ?? string.Empty)).ToList();
                var identity = new ClaimsIdentity(claims, nameof(FirebaseAuthenticationHandler));
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, JwtBearerDefaults.AuthenticationScheme);

                return AuthenticateResult.Success(ticket);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "Error verifying Firebase ID token.");
                return AuthenticateResult.Fail("Invalid or expired Firebase ID token.");
            }
        }

    }
}