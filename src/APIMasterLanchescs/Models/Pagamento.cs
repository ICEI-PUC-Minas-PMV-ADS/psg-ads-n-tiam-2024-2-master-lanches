using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Pagamento
    {
        [FirestoreProperty("idPagamento")]
        public string IdPagamento { get; set; }

        [FirestoreProperty("pedidoId")]
        public string PedidoId { get; set; }

        [FirestoreProperty("tipoPagamento")]
        public string TipoPagamento { get; set; }

        [FirestoreProperty("valorPago")]
        public decimal ValorPago { get; set; }

        [FirestoreProperty("troco")]
        public decimal Troco { get; set; }

        [FirestoreProperty("statusPagamento")]
        public string StatusPagamento { get; set; }

        [FirestoreProperty("pixDetails")]
        public PixPaymentResponse PixDetails { get; set; }
    }
}