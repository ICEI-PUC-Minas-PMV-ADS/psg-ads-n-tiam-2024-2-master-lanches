using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;
using Firebase.Auth;

namespace APIMasterLanchescs.Services
{
    public class ClienteService
    {
        private const string API_KEY = "AIzaSyCSH4jUUskcCQcpACrrGs2m7Y2pxGGhSYk";

        private readonly FirestoreContext _firestoreContext;

        public ClienteService(FirestoreContext firestoreContext)
        {
            _firestoreContext = firestoreContext;
        }

        public async Task SaveClienteAsync(Cliente cliente)
        {
            try
            {
                var collection = _firestoreContext.GetFirestoreDb().Collection("cliente");
                await collection.AddAsync(cliente);
                
                FirebaseAuthLink firebaseAuthLink = await new FirebaseAuthProvider(new FirebaseConfig(API_KEY))
                    .CreateUserWithEmailAndPasswordAsync(cliente.Email, cliente.Password, cliente.Nome);


            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao salvar cliente: " + ex.Message);
            }
        }

        public async Task Login(string email, string senha)
        {
            try
            {
                FirebaseAuthLink firebaseAuthLink = await new FirebaseAuthProvider(new FirebaseConfig(API_KEY))
                    .SignInWithEmailAndPasswordAsync(email, senha);
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao fazer login: " + ex.Message);
            }
        }
    }
}
