using Google.Cloud.Firestore;

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
    }
}
