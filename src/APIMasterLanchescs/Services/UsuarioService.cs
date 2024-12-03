using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;
using Firebase.Auth;

namespace APIMasterLanchescs.Services
{
    public class UsuarioService
    {
        private const string API_KEY = "AIzaSyCSH4jUUskcCQcpACrrGs2m7Y2pxGGhSYk";

        private readonly FirestoreContext _firestoreContext;

        public UsuarioService(FirestoreContext firestoreContext)
        {
            _firestoreContext = firestoreContext;
        }

        public async Task SalvarClienteAsync(Cliente cliente)
        {
            try
            {
                var ultimoIdDoc = await _firestoreContext.FirestoreDb.Collection("config").Document("ultimoId").GetSnapshotAsync();
                int ultimoId = 0;

                if (ultimoIdDoc.Exists && ultimoIdDoc.TryGetValue<int>("valor", out var valor))
                {
                    ultimoId = valor;
                }

                int novoId = ultimoId + 1;

                cliente.idUsuario = novoId;

                await _firestoreContext.FirestoreDb.Collection("usuario").Document(novoId.ToString()).SetAsync(cliente);

                await _firestoreContext.FirestoreDb.Collection("config").Document("ultimoId").SetAsync(new { valor = novoId });

                var authProvider = new FirebaseAuthProvider(new FirebaseConfig(API_KEY));

                var firebaseAuthLink = await authProvider.CreateUserWithEmailAndPasswordAsync(cliente.Email, cliente.Password, cliente.Nome);
            }
            catch (FirebaseAuthException ex)
            {
                throw new Exception($"Erro ao registrar o usuário no Firebase Authentication: {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao registrar o usuário no Firestore: {ex.Message}");
            }
        }


        public async Task<LoginResponse> LoginAsync(ClienteLogin clienteLogin)
        {
            try
            {
                var firebaseAuthLink = await new FirebaseAuthProvider(new FirebaseConfig(API_KEY)).SignInWithEmailAndPasswordAsync(clienteLogin.Email, clienteLogin.Senha);

                if (string.IsNullOrEmpty(firebaseAuthLink.FirebaseToken)) { throw new Exception("Erro ao gerar token de autenticação"); }

                var snapshot = await _firestoreContext.FirestoreDb.Collection("usuario").WhereEqualTo("email", clienteLogin.Email).Limit(1).GetSnapshotAsync();

                var user = snapshot.Documents.FirstOrDefault()?.ConvertTo<Usuario>();

                if (user == null) { throw new Exception("Usuário não encontrado"); }
                    
                return new LoginResponse
                {
                    Token = firebaseAuthLink.FirebaseToken,
                    Role = new Role() { Name = user.Role.Name, AccessibleScreens = user.Role.AccessibleScreens }
                };
            }
            catch (FirebaseAuthException authEx)
            {
                throw new Exception($"Erro de autenticação Firebase: {authEx.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao fazer login: {ex.Message}");
            }
        }

        public async Task<Usuario> FindUserById(int id)
        {
            var documentSnapshot = await _firestoreContext.FirestoreDb.Collection("usuario").Document(id.ToString()).GetSnapshotAsync();

            return documentSnapshot.Exists ? documentSnapshot.ConvertTo<Usuario>() : throw new KeyNotFoundException("Cliente não encontrado.");
        }

        public async Task<List<Cliente>> BuscarClientesAsync()
        {
            var clientes = new List<Cliente>();
            var snapshot = await _firestoreContext.FirestoreDb.Collection("usuario").GetSnapshotAsync();
            foreach (var document in snapshot.Documents)
            {
                clientes.Add(document.ConvertTo<Cliente>());
            }
            return clientes;
        }

        public async Task DeletarClienteAsync(int id)
        {
            var documentRef = _firestoreContext.FirestoreDb.Collection("usuario").Document(id);
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