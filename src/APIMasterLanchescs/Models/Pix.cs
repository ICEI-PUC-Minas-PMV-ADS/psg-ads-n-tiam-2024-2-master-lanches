using System.ComponentModel.DataAnnotations;

namespace APIMasterLanchescs.Models
{
    public class PixPaymentRequest
    {
        [Required]
        public decimal Amount { get; set; } // Valor do pagamento obrigatório

        public string Description { get; set; } // Descrição opcional
        public string ExternalReference { get; set; } // Referência externa opcional

        [EmailAddress]
        public string PayerEmail { get; set; } // Email do pagador (opcional)
    }

    public class PixPaymentResponse
    {
        public string QRCode { get; set; } // Base64 do QR Code
        public string PixCode { get; set; } // Código Pix
    }
}