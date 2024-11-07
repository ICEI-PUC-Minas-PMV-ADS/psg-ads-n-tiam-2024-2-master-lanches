using APIMasterLanchescs.Models;
using APIMasterLanchescs.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIMasterLanchescs.Controllers
{
    [ApiController]
<<<<<<< HEAD
    [Route("/v1/clientes")]
=======
    [Route("/v1/[controller]")]
>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
    public class ClienteController : Controller
    {
        private readonly ClienteService _clienteService;

        public ClienteController(ClienteService clienteService)
        {
            _clienteService = clienteService;
        }

<<<<<<< HEAD
        [HttpPost]
        public async Task<IActionResult> SalvarCliente([FromBody] Cliente cliente)
=======
        [HttpPost("/")]
        public async Task<IActionResult> SaveCliente([FromBody] Cliente cliente)
>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
        {
            if (cliente == null)
            {
                return BadRequest("Dados do cliente não podem ser nulos.");
            }
            try
            {
<<<<<<< HEAD
                await _clienteService.SalvarClienteAsync(cliente);
=======
                await _clienteService.SaveClienteAsync(cliente);
>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao salvar cliente: {ex.Message}");
            }
        }

<<<<<<< HEAD
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
=======
    }

>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
}
