using APIMasterLanchescs.Models;
using APIMasterLanchescs.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIMasterLanchescs.Controllers
{
    [ApiController]
    [Route("v1/pedidos")]
    [Consumes("application/json")]
    public class PedidoController : ControllerBase
    {
        private readonly PedidoService _pedidoService;
        private readonly EstoqueService _estoqueService;

        public PedidoController(PedidoService pedidoService, EstoqueService estoqueService)
        {
            _pedidoService = pedidoService;
            _estoqueService = estoqueService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Pedido pedido)
        {
            if (pedido == null)
            {
                return BadRequest(new { message = "Pedido inválido." });
            }

            await _pedidoService.MakeOrder(pedido);
            return CreatedAtAction(nameof(GetById), new { id = pedido.IdPedido }, pedido);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pedidos = await _pedidoService.FindAllPedidos();
            return Ok(pedidos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var pedido = await _pedidoService.FindPedidoById(id);
            if (pedido == null)
            {
                return NotFound(new { message = "Pedido não encontrado." });
            }
            return Ok(pedido);
        }

        [HttpGet("cliente/{idUsuario}")]
        public async Task<IActionResult> GetAllPedidosByClienteId(string idUsuario)
        {
            var pedidos = await _pedidoService.FindAllPedidosByIdCliente(idUsuario);
            if (pedidos == null || !pedidos.Any())
            {
                return NotFound(new { message = "Nenhum pedido encontrado para este cliente." });
            }
            return Ok(pedidos);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(string id, [FromQuery] string novoStatus, [FromQuery] string userRole)
        {
            if (string.IsNullOrEmpty(novoStatus))
            {
                return BadRequest(new { message = "O status do pedido é obrigatório." });
            }

            await _pedidoService.UpdatePedidoStatus(id, novoStatus, userRole);
            return NoContent();
        }
    }
}
