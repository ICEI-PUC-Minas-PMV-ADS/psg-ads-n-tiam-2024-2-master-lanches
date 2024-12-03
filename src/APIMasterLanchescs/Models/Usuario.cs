using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Usuario
    {
        [FirestoreProperty("idUsuario")]
        public int idUsuario { get; set; }

        [FirestoreProperty("nome")]
        public string Nome { get; set; }

        [FirestoreProperty("email")]
        public string Email { get; set; }

        [FirestoreProperty("telefone")]
        public string Telefone { get; set; }

        [FirestoreProperty("password")]
        public string Password { get; set; }

        [FirestoreProperty("dataCadastro")]
        public DateTime DataCadastro { get; set; }

        [FirestoreProperty("cpf")]
        public string CPF { get; set; }

        [FirestoreProperty("role")]
        public Role Role { get; set; }
    }
}
