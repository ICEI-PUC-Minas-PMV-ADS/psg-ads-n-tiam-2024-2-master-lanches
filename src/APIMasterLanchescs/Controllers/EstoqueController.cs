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

        public EstoqueController(EstoqueService estoqueService)
        {
            _estoqueService = estoqueService;
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
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        // Atualiza um produto no estoque
        [HttpPut("produtos/{id}")]
        public async Task<IActionResult> UpdateEstoque(string id, [FromBody] Estoque estoque)
        {
            try
            {
                var updatedEstoque = await _estoqueService.UpdateEstoque(id, estoque);
                return Ok(updatedEstoque);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
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
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        // Inicializa a coleção estoque com documentos padrão
        [HttpPost("inicializar")]
        public async Task<IActionResult> InitializeEstoqueCollection([FromQuery] int quantidade = 10)
        {
            try
            {
                await _estoqueService.InitializeEstoqueCollection(quantidade);
                return Ok("Coleção estoque inicializada com documentos padrão.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
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
                return StatusCode(403, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }
    }
}