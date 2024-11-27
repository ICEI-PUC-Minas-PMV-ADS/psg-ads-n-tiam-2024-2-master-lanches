using MercadoPago.Config;
using MercadoPago.Client.Payment;
using MercadoPago.Resource.Payment;
using APIMasterLanchescs.Models;

namespace APIMasterLanchescs.Services
{
    public class PixPaymentService
    {
        public PixPaymentResponse CreatePayment(PixPaymentRequest request)
        {
            // Configure o Mercado Pago SDK
            MercadoPagoConfig.AccessToken = "TEST-5213086491742764-112016-aeac350e484fffb3c8eeb2d94d8e2a0e-2107574441";

            var paymentRequest = new PaymentCreateRequest
            {
                TransactionAmount = request.Amount,
                Description = request.Description ?? "Pagamento por Pix",
                PaymentMethodId = "pix",
                ExternalReference = request.ExternalReference,
                Payer = new PaymentPayerRequest
                {
                    Email = request.PayerEmail ?? "default_email@test.com" // Email enviado pela aplicação
                }
            };

            // Realiza a criação do pagamento via SDK
            Payment payment = new PaymentClient().Create(paymentRequest);

            if (payment.Status == "pending")
            {
                return new PixPaymentResponse
                {
                    QRCode = payment.PointOfInteraction.TransactionData.QrCodeBase64,
                    PixCode = payment.PointOfInteraction.TransactionData.QrCode
                };
            }
            else
            {
                throw new Exception($"Erro ao criar o pagamento: {payment.StatusDetail}");
            }
        }
    }
}