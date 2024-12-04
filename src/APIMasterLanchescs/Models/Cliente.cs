using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Cliente : Usuario
    {
        [FirestoreProperty("endereco")]
        public Endereco Endereco { get; set; }

        [FirestoreProperty("role")]
        public Role Role { get; set; } = new Role
        {
            Name = "Cliente",
            AccessibleScreens = new List<ScreenAccess>
            {
                new ScreenAccess { name = "Login", level = 0 },
                new ScreenAccess { name = "Cadastro", level = 0 },
                new ScreenAccess { name = "PaginaInicial", level = 1 },
                new ScreenAccess { name = "PaginaPesquisa", level = 1 },
                new ScreenAccess { name = "Pesquisa", level = 1 },
                new ScreenAccess { name = "Carrinho", level = 2 },
                new ScreenAccess { name = "Perfil", level = 2 }
            }
        };
    }
}