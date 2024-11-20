using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;

namespace APIMasterLanchescs.Services
{
    public class CategoriaService
    {
        private readonly FirestoreContext _firestoreContext;

        public CategoriaService(FirestoreContext firestoreContext)
        {
            _firestoreContext = firestoreContext;
        }

        public async Task SalvarCategoriaAsync(CategoriaProduto categoria)
        {
            try
            {
                await _firestoreContext.FirestoreDb.Collection("categoriaProduto")
                    .Document(categoria.IdCategoria)
                    .SetAsync(categoria);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao salvar categoria: {ex.Message}");
            }
        }

        public async Task<List<CategoriaProduto>> BuscarCategoriasAsync()
        {
            var categorias = new List<CategoriaProduto>();
            var snapshot = await _firestoreContext.FirestoreDb.Collection("categoriaProduto").GetSnapshotAsync();
            foreach (var document in snapshot.Documents)
            {
                categorias.Add(document.ConvertTo<CategoriaProduto>());
            }
            return categorias;
        }

        public async Task<CategoriaProduto> BuscarCategoriaPorIdAsync(string id)
        {
            var documentSnapshot = await _firestoreContext.FirestoreDb.Collection("categoriaProduto")
                .Document(id)
                .GetSnapshotAsync();

            return documentSnapshot.Exists
                ? documentSnapshot.ConvertTo<CategoriaProduto>()
                : throw new KeyNotFoundException("Categoria não encontrada.");
        }
        // Método para salvar uma nova categoria
        public async Task SaveCategoriaAsync(CategoriaProduto categoriaProduto)
        {
            try
            {
                var categoriaRef = _firestoreContext.FirestoreDb.Collection("categoriaProduto").Document(categoriaProduto.IdCategoria);
                await categoriaRef.SetAsync(categoriaProduto);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao salvar categoria: {ex.Message}");
            }
        }

        // Método para buscar todas as categorias
        public async Task<List<CategoriaProduto>> FindListCategoriaAsync()
        {
            var categorias = new List<CategoriaProduto>();
            try
            {
                var snapshot = await _firestoreContext.FirestoreDb.Collection("categoriaProduto").GetSnapshotAsync();
                foreach (var document in snapshot.Documents)
                {
                    categorias.Add(document.ConvertTo<CategoriaProduto>());
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar categorias: {ex.Message}");
            }

            return categorias;
        }
    }
}