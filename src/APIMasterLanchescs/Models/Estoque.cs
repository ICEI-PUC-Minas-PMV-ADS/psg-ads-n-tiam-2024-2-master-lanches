using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Estoque
    {
        [FirestoreProperty("id")]
        public string IdProduto { get; set; }

        [FirestoreProperty("nome")]
        public string NomeProduto { get; set; }

        [FirestoreProperty("quantidade")]
        public int QuantidadeDisponivel { get; set; }

        // Campos dinâmicos para extensibilidade
        [FirestoreProperty]
        public Dictionary<string, object> CamposExtras { get; set; }
    }

}