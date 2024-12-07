using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Adicional
    {
        [FirestoreProperty("id")]
        public string Id { get; set; }

        [FirestoreProperty("nome")]
        public string Nome { get; set; }

        [FirestoreProperty("preco")]
        public double Preco { get; set; }
    }
}