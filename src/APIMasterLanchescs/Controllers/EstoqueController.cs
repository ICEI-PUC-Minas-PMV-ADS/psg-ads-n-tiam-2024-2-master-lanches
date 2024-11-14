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

        [HttpGet("produtos/{idProduto}")]
        public async Task<IActionResult> findEstoqueProdutoByIdProduto(string idProduto)
        {
            try
            {
                var estoque = await _estoqueService.FindEstoqueProdutoById(idProduto);
                return Ok(estoque);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar estoque do protudo: {idProduto} - {ex.Message}");
            }
        }
    }
}