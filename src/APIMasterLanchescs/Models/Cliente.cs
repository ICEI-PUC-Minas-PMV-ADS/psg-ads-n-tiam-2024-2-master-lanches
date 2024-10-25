using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Cliente
    {
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
        public string CPF { get; set; }
    }
}
