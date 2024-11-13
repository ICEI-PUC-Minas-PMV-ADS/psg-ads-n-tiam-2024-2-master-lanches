using APIMasterLanchescs.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIMasterLanchescs.Controllers
{
    [Route("/v1/estoques")]
    public class EstoqueController : Controller
    {
        public readonly EstoqueService _estoqueService;

        public EstoqueController(EstoqueService estoqueService)
        {
            _estoqueService = estoqueService;
        }

        [HttpGet("produtos/{id}")]
        public async Task<IActionResult> findEstoqueProdutoById(string id)
        {
            try
            {
                var estoque = await _estoqueService.FindEstoqueProdutoById(id);
                return Ok(estoque);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar estoque do protudo: {id} - {ex.Message}");
            }
        }
    }
}