using APIMasterLanchescs.Models;
using APIMasterLanchescs.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIMasterLanchescs.Controllers
{
    [ApiController]
    [Route("api/pedidos")]
    public class PedidoController : ControllerBase
    {
        private readonly PedidoService _pedidoService;

        public PedidoController(PedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Pedido pedido)
        {
            await _pedidoService.SavePedido(pedido);
            return CreatedAtAction(nameof(GetById), new { id = pedido.Id }, pedido);
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Pedido pedido)
        {
            if (id != pedido.Id)
            {
                return BadRequest(new { message = "O ID do pedido no corpo da requisição não corresponde ao ID na URL." });
            }

            await _pedidoService.UpdatePedido(pedido);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _pedidoService.DeletePedido(id);
            return NoContent();
        }
    }
}
