using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;

namespace APIMasterLanchescs.Services
{
    public class ProdutoService
    {
        private readonly FirestoreContext _firestoreContext;

        public ProdutoService(FirestoreContext firestoreContext)
        {
            _firestoreContext = firestoreContext;
        }

        public async Task SalvarProdutoAsync(Produto produto)
        {
            try
            {
                await _firestoreContext.FirestoreDb.Collection("produto")
                    .Document(produto.Id)
                    .SetAsync(produto);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao salvar produto: {ex.Message}");
            }
        }

        public async Task<Produto> BuscarProdutoPorIdAsync(string id)
        {
            var documentSnapshot = await _firestoreContext.FirestoreDb.Collection("produto")
                .Document(id)
                .GetSnapshotAsync();

            return documentSnapshot.Exists
                ? documentSnapshot.ConvertTo<Produto>()
                : throw new KeyNotFoundException("Produto não encontrado.");
        }

        public async Task<List<Produto>> BuscarProdutosAsync()
        {
            var produtos = new List<Produto>();
            var snapshot = await _firestoreContext.FirestoreDb.Collection("produto").GetSnapshotAsync();
            foreach (var document in snapshot.Documents)
            {
                produtos.Add(document.ConvertTo<Produto>());
            }
            return produtos;
        }

        public async Task AtualizarProdutoAsync(string id, Produto produto)
        {
            var documentRef = _firestoreContext.FirestoreDb.Collection("produto").Document(id);
            var documentSnapshot = await documentRef.GetSnapshotAsync();
            if (documentSnapshot.Exists)
            {
                await documentRef.SetAsync(produto);
            }
            else
            {
                throw new KeyNotFoundException("Produto não encontrado.");
            }
        }

        public async Task<List<Produto>> BuscarProdutosPorCategoriaAsync(string idCategoria)
        {
            var produtos = new List<Produto>();
            var query = _firestoreContext.FirestoreDb.Collection("produto")
                .WhereEqualTo("categoriaId", idCategoria);
            var snapshot = await query.GetSnapshotAsync();
            foreach (var document in snapshot.Documents)
            {
                produtos.Add(document.ConvertTo<Produto>());
            }
            return produtos;
        }
        public async Task DeletarProduto(string id)
        {
            try
            {
                var documentRef = _firestoreContext.FirestoreDb.Collection("produto").Document(id);
                var documentSnapshot = await documentRef.GetSnapshotAsync();
                if (documentSnapshot.Exists)
                {
                    await documentRef.DeleteAsync();
                }
                else
                {
                    throw new KeyNotFoundException("Produto não encontrado.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao deletar produto: {ex.Message}");
            }
        }
    }
}
