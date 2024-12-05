using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Configs.DbContext
{
    public class FirestoreContext
    {
        private readonly FirestoreDb _firestoreDb;

        public FirestoreContext(IConfiguration configuration)
        {
            string firebaseConfigPath = configuration["Firebase:ConfigPath"];
            string projectId = configuration["Firebase:ProjectId"];

            if (string.IsNullOrWhiteSpace(firebaseConfigPath))
            {
                throw new ArgumentException("O caminho para o arquivo de configuração do Firebase é obrigatório.", nameof(firebaseConfigPath));
            }

            if (string.IsNullOrWhiteSpace(projectId))
            {
                throw new ArgumentException("O ID do projeto Firebase é obrigatório.", nameof(projectId));
            }

            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", firebaseConfigPath);
            _firestoreDb = FirestoreDb.Create(projectId);
        }

        /// <summary>
        /// Propriedade para acessar o banco Firestore.
        /// </summary>
        public FirestoreDb FirestoreDb => _firestoreDb;

        /// <summary>
        /// Retorna uma referência para uma coleção.
        /// </summary>
        public CollectionReference GetCollection(string collectionName)
        {
            if (string.IsNullOrWhiteSpace(collectionName))
            {
                throw new ArgumentException("O nome da coleção não pode ser nulo ou vazio.", nameof(collectionName));
            }
            return _firestoreDb.Collection(collectionName);
        }

        /// <summary>
        /// Lista todos os produtos do Firestore.
        /// </summary>
        public async Task<List<Dictionary<string, object>>> ListAllProdutos()
        {
            var collection = GetCollection("produtos");
            var snapshot = await collection.GetSnapshotAsync();

            return snapshot.Documents
                .Select(doc => doc.ToDictionary())
                .ToList();
        }

        /// <summary>
        /// Sincronização automática dos produtos com estoque.
        /// </summary>
        public async Task SincronizacaoAutomatica(TimeSpan intervalo, CancellationToken stoppingToken)
        {
            while (true)
            {
                try
                {
                    // Sincroniza estoque com produtos
                    var produtos = await ListAllProdutos();
                    await SincronizarEstoqueComProdutos(produtos);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Erro na sincronização automática: {ex.Message}");
                }

                await Task.Delay(intervalo, stoppingToken);
            }
        }

        /// <summary>
        /// Sincroniza estoque com produtos fornecidos.
        /// </summary>
        private Task SincronizarEstoqueComProdutos(List<Dictionary<string, object>> produtos)
        {
            // Implementação específica para sincronização com estoque.
            // Exemplo: Atualização de contagens de estoque.
            Console.WriteLine($"Sincronizando {produtos.Count} produtos com estoque...");
            return Task.CompletedTask;
        }
    }
}