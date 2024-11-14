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
        public string MetodoPagamento { get; set; }
    }
}