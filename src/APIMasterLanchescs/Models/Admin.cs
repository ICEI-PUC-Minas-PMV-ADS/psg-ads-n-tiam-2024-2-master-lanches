using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Admin : Usuario
    {
        [FirestoreProperty("role")]
        public Role Role { get; set; } = new Role(){Name = "Admin", AccessibleScreens = { "Login", "Cadastro", "PaginaInicial", "PaginaPesquisa", "Pesquisa", "Carrinho", "Perfil" }};
    }
}
