using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;
using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIMasterLanchescs.Services
{
    public class PedidoService
    {
        private readonly FirestoreContext _firestoreContext;
        private readonly CollectionReference _pedidoCollection;

        public PedidoService(FirestoreContext firestoreContext)
        {
            _firestoreContext = firestoreContext;
            _pedidoCollection = _firestoreContext.FirestoreDb.Collection("pedido");
        }

        public async Task MakeOrder(Pedido pedido)
        {
            pedido.Status = "EmEspera";
            pedido.IdPedido = string.IsNullOrEmpty(pedido.IdPedido) ? Guid.NewGuid().ToString() : pedido.IdPedido;
            pedido.DataPedido = DateTime.UtcNow;
        }

        public async Task SavePedido(Pedido pedido)
        {
            if (pedido.Status == "Entregue" || pedido.Status == "Cancelado")
            {
                pedido.IdPedido = string.IsNullOrEmpty(pedido.IdPedido) ? Guid.NewGuid().ToString() : pedido.IdPedido;
                await _pedidoCollection.Document(pedido.IdPedido).SetAsync(pedido);
            }
            else
            {
                throw new InvalidOperationException("O pedido só pode ser salvo quando o status for 'Entregue' ou 'Cancelado'.");
            }
        }

        public async Task<List<Pedido>> FindAllPedidos()
        {
            var snapshot = await _pedidoCollection.GetSnapshotAsync();
            return snapshot.Documents.Select(doc => doc.ConvertTo<Pedido>()).ToList();
        }

        public async Task<List<Pedido>> FindAllPedidosByIdCliente(string idUsuario)
        {
            var snapshot = await _pedidoCollection
                .WhereEqualTo("clienteId", idUsuario)
                .GetSnapshotAsync();

            return snapshot.Documents.Select(doc => doc.ConvertTo<Pedido>()).ToList();
        }

        public async Task<Pedido?> FindPedidoById(string idPedido)
        {
            var docSnapshot = await _pedidoCollection.Document(idPedido).GetSnapshotAsync();
            return docSnapshot.Exists ? docSnapshot.ConvertTo<Pedido>() : null;
        }

        public async Task UpdatePedidoStatus(string idPedido, string novoStatus, string userRole)
        {
            var docSnapshot = await _pedidoCollection.Document(idPedido).GetSnapshotAsync();

            if (!docSnapshot.Exists)
                throw new KeyNotFoundException("Pedido não encontrado.");

            var pedido = docSnapshot.ConvertTo<Pedido>();

            if (userRole != "admin" && !PermissaoCliente(novoStatus))
                throw new UnauthorizedAccessException("Cliente não pode alterar para este status.");

            if (userRole == "admin" || PermissaoCliente(novoStatus))
            {
                pedido.Status = novoStatus;
                pedido.DataUltimaAtualizacao = DateTime.UtcNow;

                await SavePedido(pedido);
            }
        }

        private bool PermissaoCliente(string status)
        {
            var statusPermitidos = new[] { "Cancelado" };
            return statusPermitidos.Contains(status);
        }

        public async Task ReservarEstoqueParaPedido(Pedido pedido, EstoqueService estoqueService)
        {
            foreach (var item in pedido.Produtos)
            {
                await estoqueService.ReservarEstoque(item.Id, item.Quantidade);
            }
        }
    }
}