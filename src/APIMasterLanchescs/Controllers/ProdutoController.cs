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
            if (produto == null)
                return BadRequest("Não podem haver campos nulos.");

            try
            {
                await _produtoService.SalvarProdutoAsync(produto);
                return CreatedAtAction(nameof(FindProdutoById), new { id = produto.Id }, produto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao salvar produto: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> FindProdutoById(string id)
        {
            try
            {
                var produto = await _produtoService.BuscarProdutoPorIdAsync(id);
                return produto != null ? Ok(produto) : NotFound("Produto não encontrado.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar produto: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> FindListProduto()
        {
            try
            {
                var produtos = await _produtoService.BuscarProdutosAsync();
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar lista de produtos: {ex.Message}");
            }
        }

        [HttpPatch("sincronizar-estoque")]
        public async Task<IActionResult> SincronizarEstoque()
        {
            try
            {
                await _produtoService.SincronizarEstoqueComProdutos();
                return Ok("Estoque sincronizado com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao sincronizar estoque: {ex.Message}");
            }
        }
        
        [HttpPatch("{id}/indisponivel")]
        public async Task<IActionResult> MarcarIndisponivel(string id, [FromHeader(Name = "Role")] string userRole)
        {
            if (userRole != "admin")
                return Forbid("Ação permitida apenas para administradores.");

            try
            {
                await _produtoService.MarcarProdutoComoIndisponivelAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao atualizar status: {ex.Message}");
            }
        }
        [HttpPost("New")]
        public async Task<IActionResult> Campos()
        {
            try
            {
                await _produtoService.UpProd();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao sincronizar estoque: {ex.Message}");
            }
        }

        /* [HttpPut("{id}")]
        //Inativo
        public async Task<IActionResult> UpdateProduto(string id, [FromBody] Produto produto)
        {
            if (produto == null)
                return BadRequest("Não podem haver campos nulos.");

            try
            {
                await _produtoService.AtualizarProdutoAsync(id, produto);
                return Ok(produto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao atualizar produto: {ex.Message}");
            }
        } */

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(string id)
        {
            try
            {
                await _produtoService.MarcarProdutoComoIndisponivelAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao remover produto: {ex.Message}");
            }
        }
    }

}