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

        public async Task SalvarClienteAsync(Cliente cliente)
        {
            try
            {
                await _firestoreContext.GetFirestoreDb().Collection("cliente").AddAsync(cliente);
                
                FirebaseAuthLink firebaseAuthLink = await new FirebaseAuthProvider(new FirebaseConfig(API_KEY))
                    .CreateUserWithEmailAndPasswordAsync(cliente.Email, cliente.Password, cliente.Nome);
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao salvar cliente: " + ex.Message);
            }
        }

        public async Task<FirebaseAuthLink> Login(ClienteLogin clienteLogin)
        {
            try
            {
                var firebaseAuthLink = await new FirebaseAuthProvider(new FirebaseConfig(API_KEY))
                    .SignInWithEmailAndPasswordAsync(clienteLogin.Email, clienteLogin.Senha);
                return firebaseAuthLink;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao fazer login: " + ex.Message);
            }
        }
    }
}
