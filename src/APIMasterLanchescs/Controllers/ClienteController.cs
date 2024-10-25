using APIMasterLanchescs.Models;
using APIMasterLanchescs.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIMasterLanchescs.Controllers
{
    [ApiController]
    [Route("/v1/[controller]")]
    public class ClienteController : Controller
    {
        private readonly ClienteService _clienteService;

        public ClienteController(ClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpPost("/")]
        public async Task<IActionResult> SaveCliente([FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest("Dados do cliente não podem ser nulos.");
            }
            try
            {
                await _clienteService.SaveClienteAsync(cliente);
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao salvar cliente: {ex.Message}");
            }
        }

    }

}
