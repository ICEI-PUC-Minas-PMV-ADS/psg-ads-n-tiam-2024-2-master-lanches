using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;
using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Services
{
    public class PedidoService
    {
        private readonly FirestoreContext _firestoreContext;
        private readonly CollectionReference _pedidoCollection;

        public PedidoService(FirestoreContext firestoreContext)
        {
            _firestoreContext = firestoreContext;
            _pedidoCollection = _firestoreContext.Db.Collection("pedidos");
        }

        /*Fazer uma funcao para reservar o estoque,
        fazer funcao 
        */
        public async Task MakeOrder(Pedido pedido)
        {
            pedido.Status = "EmEspera";

        }

        public async Task SavePedido(Pedido pedido)
        {
            if(pedido.Status == "Entregue" || "Cancelado")

            pedido.Id = string.IsNullOrEmpty(pedido.Id) ? Guid.NewGuid().ToString() : pedido.Id;

            await _pedidoCollection.Document(pedido.Id).SetAsync(pedido);
        }

        public async Task<List<Pedido>> FindAllPedidos()
        {
            var snapshot = await _pedidoCollection.GetSnapshotAsync();
            return snapshot.Documents.Select(doc => doc.ConvertTo<Pedido>()).ToList();
        }

        public async Task<List<Pedido>> FindAllPedidosByIdCliente(String idUsuario)
        {
            var snapshot = await _pedidoCollection.GetSnapshotAsync();
            return snapshot.Documents.Select(doc => doc.ConvertTo<Pedido>()).ToList();
        }

        public async Task<Pedido?> FindPedidoById(string idPedido)
        {
            var docSnapshot = await _pedidoCollection.Document(id).GetSnapshotAsync();
            if (docSnapshot.Exists)
            {
                return docSnapshot.ConvertTo<Pedido>();
            }
            return null;
        }

        /* Alterar somente o status
        * CLiente e Admin podem alterar status
        * Porem o admin pode alterar para 
        */
        public async Task UpdatePedido(String status, String idUsuario)
        {
            if (string.IsNullOrEmpty(pedido.Id))
                throw new ArgumentException("O ID do pedido não pode ser nulo ou vazio.");

            var docSnapshot = await _pedidoCollection.Document(pedido.Id).GetSnapshotAsync();
            if (docSnapshot.Exists)
            {
                await _pedidoCollection.Document(pedido.Id).SetAsync(pedido);
            }
            else
            {
                throw new KeyNotFoundException("Pedido não encontrado para atualização.");
            }
        }
    }
}
