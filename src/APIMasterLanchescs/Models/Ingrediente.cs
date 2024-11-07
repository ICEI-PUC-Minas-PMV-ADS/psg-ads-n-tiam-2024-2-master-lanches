using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Ingrediente
    {
        [FirestoreProperty("idIngrediente")]
        public string IdIngrediente { get; set; }

        [FirestoreProperty("nome")]
        public string Nome { get; set; }

        [FirestoreProperty("precoUnitario")]
        public double PrecoUnitario { get; set; }

        [FirestoreProperty("quantidade")]
        public double Quantidade { get; set; }
    }
}
