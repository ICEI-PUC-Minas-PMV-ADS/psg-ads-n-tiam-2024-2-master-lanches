using APIMasterLanchescs.Models;
using APIMasterLanchescs.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIMasterLanchescs.Controllers
{
    [ApiController]
    [Route("/v1/produtos")]
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoService _produtoService;

        public ProdutoController(ProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpPost]
        public async Task<IActionResult> SaveProduto([FromBody] Produto produto)
        {
            if (produto == null) { return BadRequest("Não podem haver campos nulos"); }
            try
            {
                await _produtoService.SalvarProdutoAsync(produto);
                return Ok(produto);
            }
            catch (Exception ex) { return StatusCode(500, $"Erro ao salvar produto: {ex.Message}"); }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> FindProdutoById(string id)
        {
            try
            {
                // Usar o nome correto do método
                var produto = await _produtoService.BuscarProdutoPorIdAsync(id);
                return produto != null ? Ok(produto) : NotFound("Produto não encontrado.");
            }
            catch (Exception ex) { return StatusCode(500, $"Erro ao buscar produto: {ex.Message}"); }
        }

        [HttpGet]
        public async Task<IActionResult> FindListProduto()
        {
            try
            {
                // Usar o nome correto do método
                return Ok(await _produtoService.BuscarProdutosAsync());
            }
            catch (Exception ex) { return StatusCode(500, $"Erro ao buscar lista de produtos: {ex.Message}"); }
        }

        [HttpGet("categorias/{idCategoria}")]
        public async Task<IActionResult> FindListProdutosByCategoria(string idCategoria)
        {
            try
            {
                // Usar o nome correto do método
                var produto = await _produtoService.BuscarProdutosPorCategoriaAsync(idCategoria);
                return Ok(produto);
            }
            catch (Exception ex) { return StatusCode(500, $"Erro ao buscar lista de produtos por categoria: {ex.Message}"); }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduto(string id, [FromBody] Produto produto)
        {
            if (produto == null) { return BadRequest("Não podem haver campos nulos"); }
            try
            {
                // Usar o nome correto do método
                await _produtoService.AtualizarProdutoAsync(id, produto);
                return Ok(produto);
            }
            catch (Exception ex) { return StatusCode(500, $"Erro ao atualizar produto: {ex.Message}"); }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(string id)
        {
            try
            {
                // Adicionar implementação do método DeletarProduto no ProdutoService se necessário
                await _produtoService.DeletarProduto(id);
                return NoContent();
            }
            catch (Exception ex) { return StatusCode(500, $"Erro ao deletar produto: {ex.Message}"); }
        }
    }
}
