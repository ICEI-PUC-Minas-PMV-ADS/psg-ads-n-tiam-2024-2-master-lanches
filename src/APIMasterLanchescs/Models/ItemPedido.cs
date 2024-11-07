<<<<<<< HEAD
﻿using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class ItemPedido
    {
        [FirestoreProperty("idItemPedido")]
        public string IdItemPedido { get; set; }

        [FirestoreProperty("pedidoId")]
        public int PedidoId { get; set; }

        [FirestoreProperty("produtoId")]
        public int ProdutoId { get; set; }

        [FirestoreProperty("quantidade")]
        public int Quantidade { get; set; }

        [FirestoreProperty("precoUnitario")]
        public double PrecoUnitario { get; set; }
=======
﻿namespace APIMasterLanchescs.Models
{
    public class ItemPedido
    {
        public string IdItemPedido { get; set; }
      
        public string PedidoId { get; set; }
        
        public string ProdutoId { get; set; }
        
        public int Quantidade { get; set; }
        
        public decimal PrecoUnitario { get; set; }
>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
    }
}
