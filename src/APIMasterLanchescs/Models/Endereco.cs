using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Endereco
    {
<<<<<<< HEAD
        [FirestoreProperty("idEndereco")]
        public string IdEndereco { get; set; }

        [FirestoreProperty("clienteId")]
        public string ClienteId { get; set; }

        [FirestoreProperty("logradouro")]
        public string Logradouro { get; set; }

        [FirestoreProperty("numero")]
        public string Numero { get; set; }

        [FirestoreProperty("bairro")]
        public string Bairro { get; set; }

        [FirestoreProperty("cidade")]
        public string Cidade { get; set; }

        [FirestoreProperty("cep")]
        public string CEP { get; set; }

        [FirestoreProperty("complemento")]
=======
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
>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
        public string Complemento { get; set; }
    }
}
