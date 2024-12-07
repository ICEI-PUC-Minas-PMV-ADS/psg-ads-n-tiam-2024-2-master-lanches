using APIMasterLanchescs.Models;
using APIMasterLanchescs.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIMasterLanchescs.Controllers
{
    [Route("/v1/estoques")]
    [ApiController]
    public class EstoqueController : ControllerBase
    {
        private readonly EstoqueService _estoqueService;
        private readonly ProdutoService _produtoService;

        public EstoqueController(EstoqueService estoqueService, ProdutoService produtoService)
        {
            _estoqueService = estoqueService;
            _produtoService = produtoService;
        }

        // Consulta um produto no estoque por ID
        [HttpGet("produtos/{id}")]
        public async Task<IActionResult> FindEstoqueProdutoById(string id)
        {
            try
            {
                var estoque = await _estoqueService.FindEstoqueProdutoById(id);
                return Ok(estoque);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        // Atualiza um produto no estoque
        [HttpPut("produtos/{id}")]
        public async Task<IActionResult> UpdateEstoque(string id, [FromBody] int estoque)
        {
            try
            {
                var updatedEstoque = await _estoqueService.UpdateEstoque(id, estoque);
                return Ok(updatedEstoque);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        // Lista todos os produtos no estoque
        [HttpGet("produtos")]
        public async Task<IActionResult> ListAllEstoque()
        {
            try
            {
                var estoques = await _estoqueService.ListAllEstoque();
                return Ok(estoques);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao Atualizar Estoque: {ex.Message}");
            }
        }


        // Adiciona ou atualiza campos em todos os documentos (Apenas para admins)
        [HttpPost("atualizar-campos")]
        public async Task<IActionResult> UpdateFieldsInAllDocuments(
            [FromBody] Dictionary<string, object> fieldsToUpdate,
            [FromHeader(Name = "Role")] string userRole)
        {
            try
            {
                await _estoqueService.UpdateFieldsInAllDocuments(fieldsToUpdate, userRole);
                return Ok("Campos atualizados em todos os documentos.");
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }
        [HttpPost("inicializar")]
        public async Task<IActionResult> InicializarEstoque()
        {
            try
            {
                var produtos = await _produtoService.BuscarProdutosAsync();
                await _estoqueService.SincronizarEstoqueComProdutos(produtos);
                return Ok("Estoque sincronizado com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao inicializar estoque: {ex.Message}");
            }
        }

    }
}