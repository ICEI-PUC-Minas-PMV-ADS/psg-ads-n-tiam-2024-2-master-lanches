using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Ingrediente
    {
        [FirestoreProperty("id")]
        public string Id { get; set; }

        [FirestoreProperty("nome")]
        public string Nome { get; set; }

        [FirestoreProperty("precoUnitario")]
        public double PrecoUnitario { get; set; }

        [FirestoreProperty("quantidade")]
        public int Quantidade { get; set; }
        [FirestoreProperty("essencial")]
        public bool Essencial { get; set; }
    }
}
