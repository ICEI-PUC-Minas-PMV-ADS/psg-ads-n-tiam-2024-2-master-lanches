using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;
using FirebaseAdmin.Auth;

namespace APIMasterLanchescs.Services
{
    public class UsuarioService
    {
        private readonly FirestoreContext _firestoreContext;

        public UsuarioService(FirestoreContext firestoreContext)
        {
            _firestoreContext = firestoreContext;
        }

        public async Task SalvarClienteAsync(Cliente cliente)
        {
            try
            {
                // Verificar se o e-mail já existe no Firebase Authentication
                try
                {
                    await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(cliente.Email);
                    throw new Exception("Já existe um usuário com este e-mail.");
                }
                catch (FirebaseAuthException ex) when (ex.AuthErrorCode == AuthErrorCode.UserNotFound)
                {
                    // Prosseguir apenas se o e-mail não existir
                }

                // Verificar se o e-mail já existe no Firestore
                var query = _firestoreContext.FirestoreDb.Collection("usuario").WhereEqualTo("Email", cliente.Email);
                var querySnapshot = await query.GetSnapshotAsync();
                if (querySnapshot.Documents.Count > 0)
                {
                    throw new Exception("Já existe um usuário com este e-mail no sistema.");
                }

                // Buscar o último ID registrado
                var ultimoIdDoc = await _firestoreContext.FirestoreDb.Collection("config").Document("ultimoId").GetSnapshotAsync();
                int ultimoId = ultimoIdDoc.Exists ? ultimoIdDoc.GetValue<int>("valor") : 0;

                int novoId = ultimoId + 1;
                cliente.idUsuario = novoId;

                // Verificar a imagem de perfil
                if (cliente.ImagemPerfil == null || cliente.ImagemPerfil.Length == 0)
                {
                    cliente.ImagemPerfil = await File.ReadAllBytesAsync("assets/Default_user_image.jpg");
                }

                // Criar usuário no Firebase Authentication
                await FirebaseAuth.DefaultInstance.CreateUserAsync(new UserRecordArgs
                {
                    Email = cliente.Email,
                    Password = cliente.Password,
                    DisplayName = cliente.Nome
                });

                // Salvar o cliente no Firestore
                await _firestoreContext.FirestoreDb.Collection("usuario").Document(novoId.ToString()).SetAsync(cliente);

                // Atualizar o último ID em "config"
                await _firestoreContext.FirestoreDb.Collection("config").Document("ultimoId").SetAsync(new { valor = novoId });
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao registrar o cliente: {ex.Message}", ex);
            }
        }


        public async Task<LoginResponse> LoginAsync(ClienteLogin clienteLogin)
        {
            try
            {
                // Autenticar no Firebase Authentication
                var authProvider = FirebaseAuth.DefaultInstance;
                var firebaseAuthLink = await FirebaseAuth.DefaultInstance.CreateCustomTokenAsync(clienteLogin.Email);

                if (string.IsNullOrEmpty(firebaseAuthLink))
                {
                    throw new Exception("Erro ao gerar token de autenticação.");
                }

                // Verificar existência no Firestore
                var snapshot = await _firestoreContext.FirestoreDb.Collection("usuario")
                    .WhereEqualTo("Email", clienteLogin.Email).Limit(1).GetSnapshotAsync();

                var user = snapshot.Documents.FirstOrDefault()?.ConvertTo<Usuario>();

                if (user == null)
                {
                    throw new Exception("Usuário inconsistente. Entre em contato com o suporte.");
                }

                return new LoginResponse
                {
                    Token = firebaseAuthLink,
                    Role = user.Role,
                    UserID = user.idUsuario
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
        public async Task<Dictionary<string, object>> ObterInformacoesGeraisUsuarioAsync(int id)
        {
            var documentSnapshot = await _firestoreContext.FirestoreDb.Collection("usuario").Document(id.ToString()).GetSnapshotAsync();

            if (!documentSnapshot.Exists)
            {
                throw new KeyNotFoundException("Usuário não encontrado.");
            }

            var usuario = documentSnapshot.ConvertTo<Usuario>();

            return new Dictionary<string, object>
                    {
                        { "Nome", usuario.Nome },
                        { "Email", usuario.Email },
                        { "Telefone", usuario.Telefone },
                        { "DataCadastro", usuario.DataCadastro },
                        { "ImagemPerfil", Convert.ToBase64String(usuario.ImagemPerfil ?? new byte[0]) },
                        { "Role", usuario.Role.Name },
                        { "AccessibleScreens", usuario.Role.AccessibleScreens }
                    };
        }

        public async Task AtualizarCampoUsuarioAsync(int id, string campo, object novoValor)
        {
            var documentRef = _firestoreContext.FirestoreDb.Collection("usuario").Document(id.ToString());
            var documentSnapshot = await documentRef.GetSnapshotAsync();

            if (!documentSnapshot.Exists)
            {
                throw new KeyNotFoundException("Usuário não encontrado.");
            }

            if (campo == "imagemPerfil" && novoValor is string base64String)
            {
                novoValor = Convert.FromBase64String(base64String);
            }

            await documentRef.UpdateAsync(campo, novoValor);
        }

        public async Task DeletarClienteAsync(string uid)
        {
            try
            {
                // Remover o usuário do Firestore
                var documentRef = _firestoreContext.FirestoreDb.Collection("usuario").Document(uid);
                var documentSnapshot = await documentRef.GetSnapshotAsync();

                if (!documentSnapshot.Exists)
                {
                    throw new KeyNotFoundException("Usuário não encontrado no Firestore.");
                }

                await documentRef.DeleteAsync();

                // Remover o usuário do Firebase Authentication
                await FirebaseAuth.DefaultInstance.DeleteUserAsync(uid);
            }
            catch (FirebaseAuthException ex)
            {
                throw new Exception($"Erro ao remover do Firebase Authentication: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro geral ao deletar o cliente: {ex.Message}", ex);
            }
        }
    }
}