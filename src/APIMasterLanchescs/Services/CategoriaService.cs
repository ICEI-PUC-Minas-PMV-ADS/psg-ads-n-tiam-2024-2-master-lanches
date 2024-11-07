using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;

namespace APIMasterLanchescs.Services
{
    public class CategoriaService
    {
        private readonly FirestoreContext _firebaseContext;

        public CategoriaService(FirestoreContext firebaseContext)
        {
            _firebaseContext = firebaseContext;
        }

        public async Task SaveCategoriaAsync(CategoriaProduto categoria)
        {
            try{ await _firebaseContext.GetFirestoreDb().Collection("categoriaProduto").Document(categoria.IdCategoria).SetAsync(categoria); }
            catch (Exception ex) { throw new Exception("Erro ao salvar produto: " + ex.Message); }
        }

        public async Task<List<CategoriaProduto>> FindListCategoriaAsync()
        {
            var categorias = new List<CategoriaProduto>();
            var snapshot = await _firebaseContext.GetFirestoreDb().Collection("categoriaProduto").GetSnapshotAsync();
            foreach (var item in snapshot.Documents) { categorias.Add(item.ConvertTo<CategoriaProduto>()); }
            return categorias;
        }
    }
}
