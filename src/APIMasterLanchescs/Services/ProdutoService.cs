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
            try { await _firestoreContext.GetFirestoreDb().Collection("produto").Document(produto.IdProduto).SetAsync(produto); }
            catch (Exception ex) { throw new Exception("Erro ao salvar produto: " + ex.Message); }
        }

        public async Task<Produto> BuscarProdutoIdAsync(string id)
        {
            var documentSnapshot = await _firestoreContext.GetFirestoreDb().Collection("produto").Document(id.ToString()).GetSnapshotAsync();
            return documentSnapshot.Exists ? documentSnapshot.ConvertTo<Produto>() : throw new Exception("Produto não encontrado.");
        }

        public async Task<List<Produto>> BuscarListaProdutoAsync()
        {
            var produtos = new List<Produto>();
            var snapshot = await _firestoreContext.GetFirestoreDb().Collection("produto").GetSnapshotAsync();
            foreach (var document in snapshot.Documents){ produtos.Add(document.ConvertTo<Produto>()); }
            return produtos;
        }

        public async Task DeletarProduto(string id)
        {
            var documentRef = _firestoreContext.GetFirestoreDb().Collection("produto").Document(id.ToString());
            var documentSnapshot = await documentRef.GetSnapshotAsync();
            if (documentSnapshot.Exists) { await documentRef.DeleteAsync(); }
            else { throw new Exception("Produto não encontrado."); }
        }

        public async Task AtualizarProduto(string id, Produto produto)
        {
            var documentRef = _firestoreContext.GetFirestoreDb().Collection("produto").Document(id);
            var documentSnapshot = await documentRef.GetSnapshotAsync();
            if (documentSnapshot.Exists) { await documentRef.SetAsync(produto); }
            else { throw new Exception("Produto não encontrado."); }
        }

        public async Task<List<Produto>> FindListaProdutoByCategoriaAsync(string idCategoria)
        {
            var produtos = new List<Produto>();
            var documentRef = _firestoreContext.GetFirestoreDb().Collection("produto");
            var query = documentRef.WhereEqualTo("categoriaId", idCategoria);
            var snapshot = await query.GetSnapshotAsync();
            foreach (var document in snapshot.Documents)
            {
                var produto = document.ConvertTo<Produto>();
                produtos.Add(produto);
            }
            return produtos;
        }
    }
}
