<<<<<<< HEAD
﻿using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Pagamento
    {
        [FirestoreProperty("idEstoque")]
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
=======
﻿namespace APIMasterLanchescs.Models
{
    public class Pagamento
    {
        public string IdPagamento { get; set; }
     
        public string PedidoId { get; set; }
        
        public string TipoPagamento { get; set; }
        
        public decimal ValorPago { get; set; }
        
        public decimal Troco { get; set; }
        
>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
        public string StatusPagamento { get; set; }
    }
}
