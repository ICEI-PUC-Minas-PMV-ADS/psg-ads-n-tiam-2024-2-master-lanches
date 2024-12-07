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
        public DateTime DataUltimaAtualizacao { get; set; } // Campo adicional para controle
        public int QuantidadeReservada { get; set; }
        public DateTime? DataReserva { get; set; }
        public string Versao {get; set;}

        // Campos dinâmicos para extensibilidade
        [FirestoreProperty]
        public Dictionary<string, object> CamposExtras { get; set; }
    }

}