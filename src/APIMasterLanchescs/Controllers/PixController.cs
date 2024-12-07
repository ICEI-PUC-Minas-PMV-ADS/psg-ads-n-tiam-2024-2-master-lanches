using Microsoft.AspNetCore.Mvc;
using APIMasterLanchescs.Models;
using APIMasterLanchescs.Services;

namespace APIMasterLanchescs.Controllers
{
    [ApiController]
    [Route("/v1/pagamento/pix")]
    public class PixPaymentController : ControllerBase
    {
        private readonly PixPaymentService _paymentService;

        public PixPaymentController(PixPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        // Criar pagamento
        [HttpPost]
        public IActionResult CreatePayment([FromBody] PixPaymentRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var response = _paymentService.CreatePayment(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // Retornar QR Code por filename
        [HttpGet("qrcodes/{filename}")]
        public IActionResult GetQRCode(string filename)
        {
            var filePath = Path.Combine("wwwroot", "qrcodes", filename);
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(new { error = "QR Code não encontrado" });
            }

            return PhysicalFile(filePath, "image/png");
        }

        // Retorna pagamentos por usuário
        [HttpGet("usuario/{userId}")]
        public IActionResult GetPagamentosPorUsuario(int userId)
        {
            // Simulação: você deve implementar a lógica real de busca no banco de dados
            var pagamentos = new List<object>
            {
                new { Id = 1, UsuarioId = userId, Valor = 100, Status = "pending" },
                new { Id = 2, UsuarioId = userId, Valor = 50, Status = "completed" }
            };

            return Ok(pagamentos);
        }

        // Retorna todos os pagamentos (administrador)
        [HttpGet("admin")]
        public IActionResult GetTodosPagamentos()
        {
            // Simulação: implementar lógica real de busca no banco de dados
            var pagamentos = new List<object>
            {
                new { Id = 1, UsuarioId = 1, Valor = 100, Status = "pending" },
                new { Id = 2, UsuarioId = 2, Valor = 50, Status = "completed" }
            };

            return Ok(pagamentos);
        }
        [HttpGet("{id}")]
        public IActionResult GetPaymentStatus(int id)
        {
            try
            {
                var paymentStatus = _paymentService.ConsultarStatus(id);
                return Ok(paymentStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

    }
}