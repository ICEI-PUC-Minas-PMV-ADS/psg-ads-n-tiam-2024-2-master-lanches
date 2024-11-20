using APIMasterLanchescs.Models;
using APIMasterLanchescs.Configs.DbContext;
using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Services
{
    public class EstoqueService
    {
        private readonly FirestoreDb _firestoreDb;

        public EstoqueService(FirestoreContext firestoreContext)
        {
            _firestoreDb = firestoreContext.FirestoreDb;
        }

        public async Task<Estoque> FindEstoqueProdutoById(string estoqueId)
        {
            var documentSnapshot = await _firestoreDb.Collection("estoque")
                .Document(estoqueId)
                .GetSnapshotAsync();

            return documentSnapshot.Exists
                ? documentSnapshot.ConvertTo<Estoque>()
                : throw new KeyNotFoundException("Produto não encontrado no estoque.");
        }

        public async Task<Estoque> UpdateEstoque(string estoqueId, Estoque estoque)
        {
            var documentRef = _firestoreDb.Collection("estoque").Document(estoqueId);

            var documentSnapshot = await documentRef.GetSnapshotAsync();
            if (documentSnapshot.Exists)
            {
                estoque.CamposExtras["DataUltimaAtualizacao"] = DateTime.UtcNow;
                await documentRef.UpdateAsync(estoque.CamposExtras);
                return estoque;
            }

            throw new KeyNotFoundException("Produto não encontrado no estoque.");
        }

        public async Task<List<Estoque>> ListAllEstoque()
        {
            var snapshot = await _firestoreDb.Collection("estoque").GetSnapshotAsync();

            return snapshot.Documents
                .Select(doc =>
                {
                    var estoque = doc.ConvertTo<Estoque>();
                    estoque.CamposExtras = doc.ToDictionary()
                        .Where(kv => !estoque.GetType().GetProperties().Any(prop => prop.Name.Equals(kv.Key, StringComparison.OrdinalIgnoreCase)))
                        .ToDictionary(kv => kv.Key, kv => kv.Value);
                    return estoque;
                })
                .OrderBy(e => e.NomeProduto)
                .ToList();
        }

        public async Task InitializeEstoqueCollection(int quantidadeDocumentos)
        {
            var collectionRef = _firestoreDb.Collection("estoque");

            for (int i = 0; i < quantidadeDocumentos; i++)
            {
                var novoEstoque = new Estoque
                {
                    IdProduto = Guid.NewGuid().ToString(),
                    NomeProduto = $"Produto {i + 1}",
                    QuantidadeDisponivel = new Random().Next(1, 100),
                    CamposExtras = new Dictionary<string, object>
                    {
                        { "UnidadeMedida", "unidade" },
                        { "Categoria", "Alimentos" },
                        { "Validade", DateTime.UtcNow.AddDays(new Random().Next(10, 365)) },
                        { "DataUltimaAtualizacao", DateTime.UtcNow },
                        { "Descricao", "Descrição padrão do produto" }
                    }
                };

                await collectionRef.AddAsync(novoEstoque);
            }
        }

        public async Task UpdateFieldsInAllDocuments(Dictionary<string, object> fieldsToUpdate, string userRole)
        {
            if (userRole != "admin")
                throw new UnauthorizedAccessException("Ação permitida apenas para administradores.");

            var snapshot = await _firestoreDb.Collection("estoque").GetSnapshotAsync();

            foreach (var document in snapshot.Documents)
            {
                await document.Reference.UpdateAsync(fieldsToUpdate);
            }
        }
    }
}