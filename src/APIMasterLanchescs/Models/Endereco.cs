using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Endereco
    {
        [FirestoreProperty]
        public string IdEndereco { get; set; }

        [FirestoreProperty]
        public string ClienteId { get; set; }

        [FirestoreProperty]
        public string Logradouro { get; set; }

        [FirestoreProperty]
        public string Numero { get; set; }

        [FirestoreProperty]
        public string Bairro { get; set; }

        [FirestoreProperty]
        public string Cidade { get; set; }

        [FirestoreProperty]
        public string CEP { get; set; }

        [FirestoreProperty]
        public string Complemento { get; set; }
    }
}
