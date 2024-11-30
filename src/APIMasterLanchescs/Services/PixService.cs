using MercadoPago.Config;
using MercadoPago.Client.Payment;
using MercadoPago.Resource.Payment;
using APIMasterLanchescs.Models;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace APIMasterLanchescs.Services
{
    public class PixPaymentService
    {
        public PixPaymentResponse CreatePayment(PixPaymentRequest request)
        {
            // Configura Mercado Pago SDK
            MercadoPagoConfig.AccessToken = "TEST-5213086491742764-112016-aeac350e484fffb3c8eeb2d94d8e2a0e-2107574441";

            var paymentRequest = new PaymentCreateRequest
            {
                TransactionAmount = request.Amount,
                Description = request.Description ?? "Pagamento por Pix",
                PaymentMethodId = "pix",
                ExternalReference = request.ExternalReference,
                Payer = new PaymentPayerRequest
                {
                    Email = request.PayerEmail ?? "default_email@test.com"
                }
            };

            var paymentClient = new PaymentClient();
            Payment payment = paymentClient.Create(paymentRequest);

            if (payment.Status == "pending")
            {
                string qrCodeBase64 = payment.PointOfInteraction.TransactionData.QrCodeBase64;
                string pixCode = payment.PointOfInteraction.TransactionData.QrCode;

                // Converte QR Code Base64 para imagem, para registro (outros possiveis usos no futuro)
                SaveQrCodeImage(qrCodeBase64);

                return new PixPaymentResponse
                {
                    QRCode = qrCodeBase64,
                    PixCode = pixCode,
                    Status = payment.Status,
                    StatusDetail = payment.StatusDetail
                };
            }
            else
            {
                throw new Exception($"Erro ao criar o pagamento: {payment.StatusDetail}");
            }
        }

        private string SaveQrCodeImage(string qrCodeBase64)
        {
            byte[] imageBytes = Convert.FromBase64String(qrCodeBase64);

            // Define o caminho completo para salvar o QR Code
            string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "qrcodes");
            Directory.CreateDirectory(directoryPath);

            string fileName = $"{Guid.NewGuid()}.png";
            string fullPath = Path.Combine(directoryPath, fileName);

            using (var ms = new MemoryStream(imageBytes))
            {
                using (var bitmap = new Bitmap(ms))
                {
                    bitmap.Save(fullPath, ImageFormat.Png);
                }
            }

            // Retorna o caminho relativo
            return Path.Combine("qrcodes", fileName).Replace("\\", "/");
        }
    }
}