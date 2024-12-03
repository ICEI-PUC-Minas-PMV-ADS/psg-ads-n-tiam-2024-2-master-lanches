using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Cliente : Usuario
    {
        [FirestoreProperty("endereco")]
        public Endereco Endereco { get; set; }
    
        [FirestoreProperty("role")]
        public Role Role { get; set; } = new Role(){Name = "Cliente", AccessibleScreens = {"Login", "Cadastro", "PaginaInicial", "PaginaPesquisa", "Pesquisa", "Carrinho", "Perfil"}};
    }
}
