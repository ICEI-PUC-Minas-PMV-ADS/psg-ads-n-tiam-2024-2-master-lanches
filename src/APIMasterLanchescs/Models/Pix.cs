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
        public byte[] QRCodeBytes { get; set; } // QR Code como array de bytes
        public string PixCode { get; set; } // Código Pix
        public string Status { get; set; } // Status do pagamento
        public string StatusDetail { get; set; } // Detalhes do status
        public DateTime? Expiration {get; set; }
    }
    public class PixPaymentStatus
    {
        public string Status { get; set; }
        public string StatusDetail { get; set; }
    }
}