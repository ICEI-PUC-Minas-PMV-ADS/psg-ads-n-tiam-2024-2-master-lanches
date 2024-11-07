using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Estoque
    {
        [FirestoreProperty("idEstoque")]
        public string IdEstoque { get; set; }

        [FirestoreProperty("produtoId")]
        public string ProdutoId { get; set; }

        [FirestoreProperty("quantidadeDisponivel")]
        public int QuantidadeDisponivel { get; set; }

        [FirestoreProperty("unidadeMedida")]
        public string UnidadeMedida { get; set; }

        [FirestoreProperty("dataUltimaAtualizacao")]
        public DateTime DataUltimaAtualizacao { get; set; }
    }
}
