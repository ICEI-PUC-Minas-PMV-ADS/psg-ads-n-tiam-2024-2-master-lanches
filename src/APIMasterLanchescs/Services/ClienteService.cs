using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;
using Firebase.Auth;

namespace APIMasterLanchescs.Services
{
    public class ClienteService
    {
        private const string API_KEY = "SUA_CHAVE_FIREBASE";
        private readonly FirestoreContext _firestoreContext;

        public ClienteService(FirestoreContext firestoreContext)
        {
            _firestoreContext = firestoreContext;
        }

        public async Task SalvarClienteAsync(Cliente cliente)
        {
            try
            {
                await _firestoreContext.FirestoreDb.Collection("cliente").AddAsync(cliente);

                var authProvider = new FirebaseAuthProvider(new FirebaseConfig(API_KEY));
                await authProvider.CreateUserWithEmailAndPasswordAsync(cliente.Email, cliente.Password, cliente.Nome);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao salvar cliente: {ex.Message}");
            }
        }

        public async Task<FirebaseAuthLink> LoginAsync(ClienteLogin clienteLogin)
        {
            try
            {
                var authProvider = new FirebaseAuthProvider(new FirebaseConfig(API_KEY));
                return await authProvider.SignInWithEmailAndPasswordAsync(clienteLogin.Email, clienteLogin.Senha);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao fazer login: {ex.Message}");
            }
        }

        public async Task<List<Cliente>> BuscarClientesAsync()
        {
            var clientes = new List<Cliente>();
            var snapshot = await _firestoreContext.FirestoreDb.Collection("cliente").GetSnapshotAsync();
            foreach (var document in snapshot.Documents)
            {
                clientes.Add(document.ConvertTo<Cliente>());
            }
            return clientes;
        }

        public async Task DeletarClienteAsync(string id)
        {
            var documentRef = _firestoreContext.FirestoreDb.Collection("cliente").Document(id);
            var documentSnapshot = await documentRef.GetSnapshotAsync();
            if (documentSnapshot.Exists)
            {
                await documentRef.DeleteAsync();
            }
            else
            {
                throw new KeyNotFoundException("Cliente não encontrado.");
            }
        }
    }
}