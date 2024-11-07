<<<<<<< HEAD
﻿using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Pedido
    {
        [FirestoreProperty("idPedido")]
        public string IdPedido { get; set; }

        [FirestoreProperty("clienteId")]
        public string ClienteId { get; set; }

        [FirestoreProperty("valorTotal")]
        public double ValorTotal { get; set; }

        [FirestoreProperty("dataPedido")]
        public DateTime DataPedido { get; set; }

        [FirestoreProperty("status")]
        public string Status { get; set; }

        [FirestoreProperty("enderecoEntrega")]
        public Endereco EnderecoEntrega { get; set; }

        [FirestoreProperty("metodoPagamento")]
=======
﻿namespace APIMasterLanchescs.Models
{
    public class Pedido
    {
        public string IdPedido { get; set; }
        
        public string ClienteId { get; set; }
        
        public decimal ValorTotal { get; set; }
        
        public DateTime DataPedido { get; set; }
        
        public string Status { get; set; }
        
        public Endereco EnderecoEntrega { get; set; }
        
>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
        public string MetodoPagamento { get; set; }
    }
}
