using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Produto
    {
        [FirestoreProperty("idProduto")]
        public string IdProduto { get; set; }

        [FirestoreProperty("nome")]
        public string Nome { get; set; }

        [FirestoreProperty("precoUnitario")]
        public double Preco { get; set; }

        [FirestoreProperty("categoriaId")]
        public string CategoriaId { get; set; }

        [FirestoreProperty("quantidade")]
        public int Quantidade { get; set; }

        [FirestoreProperty("imagemUrl")]
        public string ImagemUrl { get; set; }

        [FirestoreProperty("statusDisponibilidade")]
        public bool StatusDisponibilidade { get; set; }

        [FirestoreProperty("ingredientes")]
        public List<Ingrediente> Ingredientes { get; set; }
    }
}
