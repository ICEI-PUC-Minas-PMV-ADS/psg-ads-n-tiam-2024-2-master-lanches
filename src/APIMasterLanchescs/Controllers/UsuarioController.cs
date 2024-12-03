using APIMasterLanchescs.Models;
using APIMasterLanchescs.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIMasterLanchescs.Controllers
{
    [ApiController]
    [Route("/v1/usuarios")]
    public class UsuarioController : Controller
    {
        private readonly UsuarioService _clienteService;

        public UsuarioController(UsuarioService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpPost]
        public async Task<IActionResult> SalvarCliente([FromBody] Cliente cliente)
        {
            await _clienteService.SalvarClienteAsync(cliente);
            return Ok(cliente);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginCliente([FromBody] ClienteLogin clienteLogin)
        {
            var firebaseAuthLink = await _clienteService.LoginAsync(clienteLogin);
            return Ok(firebaseAuthLink);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> FindUserById(int id)
        {
            var user = await _clienteService.FindUserById(id);
            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> BuscarClientes()
        {
            var clientes = await _clienteService.BuscarClientesAsync();
            return Ok(clientes);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarCliente(string id)
        {
            await _clienteService.DeletarClienteAsync(id);
            return NoContent();
        }
    }
}
