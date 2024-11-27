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

        [HttpPost("create")]
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
    }
}