using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class CategoriaProduto
    {
        [FirestoreProperty("id")]
        public string IdCategoria { get; set; }

        [FirestoreProperty("nome")]
        public string Nome { get; set; }

        [FirestoreProperty("descricao")]
        public string Descricao { get; set; }
    }
}
