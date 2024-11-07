using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;

namespace APIMasterLanchescs.Services
{
    public class EstoqueService
    {
        private readonly FirestoreContext _firestoreContext;

        public EstoqueService(FirestoreContext firestoreContext)
        {
            _firestoreContext = firestoreContext;
        }

        public async Task<Estoque> FindEstoqueProdutoById(string estoqueId)
        {
            var documentSnapshot = await _firestoreContext.GetFirestoreDb().Collection("estoque").Document(estoqueId).GetSnapshotAsync();
            return documentSnapshot.Exists ? documentSnapshot.ConvertTo<Estoque>() : throw new Exception("NAO EXISTE O ESTOQUE INDICADO.");
        }

        public async Task<Estoque> UpdateEstoque(Estoque estoque, string estoqueId)
        {
            var documentRef = _firestoreContext.GetFirestoreDb().Collection("estoque").Document(estoqueId);
            var documentSnapshot = await documentRef.GetSnapshotAsync();
            if (documentSnapshot.Exists)
            {
                await documentRef.SetAsync(estoque);
                return estoque;
            }
            else
            {
                throw new Exception("NAO EXISTE O ESTOQUE INDICADO.");
            }
        }


    }
}
