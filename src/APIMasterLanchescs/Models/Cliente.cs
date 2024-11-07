using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Cliente
    {
<<<<<<< HEAD
        [FirestoreProperty("idCliente")]
        public string IdCliente { get; set; }

        [FirestoreProperty("nome")]
        public string Nome { get; set; }

        [FirestoreProperty("email")]
        public string Email { get; set; }

        [FirestoreProperty("telefone")]
        public string Telefone { get; set; }

        [FirestoreProperty("password")]
        public string Password { get; set; }

        [FirestoreProperty("endereco")]
        public Endereco Endereco { get; set; }

        [FirestoreProperty("dataCadastro")]
        public DateTime DataCadastro { get; set; }

        [FirestoreProperty("cpf")]
=======
        [FirestoreProperty]
        public string IdCliente { get; set; }

        [FirestoreProperty]
        public string Nome { get; set; }

        [FirestoreProperty]
        public string Email { get; set; }

        [FirestoreProperty]
        public string Telefone { get; set; }

        [FirestoreProperty]
        public string Password { get; set; }

        [FirestoreProperty]
        public Endereco Endereco { get; set; }

        [FirestoreProperty]
        public DateTime DataCadastro { get; set; }

        [FirestoreProperty]
>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
        public string CPF { get; set; }
    }
}
