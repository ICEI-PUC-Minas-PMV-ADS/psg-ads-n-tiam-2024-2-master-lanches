using APIMasterLanchescs.Models;
using APIMasterLanchescs.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIMasterLanchescs.Controllers
{
    [ApiController]
    [Route("/v1/categorias-produtos")]
    public class CategoriaController : Controller
    {
        private readonly CategoriaService _categoriaService;

        public CategoriaController(CategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpPost]
        public async Task<IActionResult> SaveCategoria([FromBody] CategoriaProduto categoriaProduto)
        {
            if (categoriaProduto == null) { return BadRequest("Não podem haver campos nulos"); }
            try
            {
                await _categoriaService.SaveCategoriaAsync(categoriaProduto);
                return Ok(categoriaProduto);
            }
            catch (Exception ex) { return StatusCode(500, $"Erro ao salvar categoria: {ex.Message}"); }
        }

        [HttpGet]
        public async Task<IActionResult> FindListCategoria()
        {
            try
            {
                var categorias = await _categoriaService.FindListCategoriaAsync();
                return Ok(categorias);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
