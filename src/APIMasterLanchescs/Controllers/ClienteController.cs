using APIMasterLanchescs.Models;
using APIMasterLanchescs.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIMasterLanchescs.Controllers
{
    [ApiController]
    [Route("/v1/clientes")]
    public class ClienteController : Controller
    {
        private readonly ClienteService _clienteService;

        public ClienteController(ClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpPost]
        public async Task<IActionResult> SalvarCliente([FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest("Dados do cliente não podem ser nulos.");
            }
            try
            {
                await _clienteService.SalvarClienteAsync(cliente);
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao salvar cliente: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginCliente([FromBody] ClienteLogin clienteLogin)
        {
            if (clienteLogin == null)
            {
                return BadRequest("Dados do cliente não podem ser nulos.");
            }

            try
            {
                var firebaseAuthLink = await _clienteService.Login(clienteLogin);
                return Ok(new { Token = firebaseAuthLink.FirebaseToken, Email = clienteLogin.Email });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao logar: {ex.Message}");
            }
        }
    }
}
