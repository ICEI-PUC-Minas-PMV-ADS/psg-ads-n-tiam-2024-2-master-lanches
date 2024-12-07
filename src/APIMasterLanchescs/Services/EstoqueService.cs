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
        public async Task ReservarEstoque(string estoqueId, int quantidade)
        {
            var itemEstoque = await FindEstoqueProdutoById(estoqueId);
            if (itemEstoque == null)
                throw new KeyNotFoundException("Produto não encontrado no estoque.");

            if (itemEstoque.QuantidadeDisponivel < quantidade)
                throw new InvalidOperationException("Estoque insuficiente para a reserva.");

            itemEstoque.QuantidadeDisponivel -= quantidade;
            itemEstoque.QuantidadeReservada += quantidade;
            itemEstoque.DataReserva = DateTime.UtcNow;

            await _firestoreDb.Collection("estoque").Document(estoqueId).SetAsync(itemEstoque);
        }

        public async Task CancelarReserva(string estoqueId, int quantidade)
        {
            var itemEstoque = await FindEstoqueProdutoById(estoqueId);
            if (itemEstoque == null)
                throw new KeyNotFoundException("Produto não encontrado no estoque.");

            if (itemEstoque.QuantidadeReservada < quantidade)
                throw new InvalidOperationException("Quantidade a cancelar maior que o reservado.");

            itemEstoque.QuantidadeDisponivel += quantidade;
            itemEstoque.QuantidadeReservada -= quantidade;

            await _firestoreDb.Collection("estoque").Document(estoqueId).SetAsync(itemEstoque);
        }
        public async Task<Estoque> FindEstoqueProdutoById(string estoqueId)
        {
            var documentSnapshot = await _firestoreDb.Collection("estoque").Document(estoqueId).GetSnapshotAsync();
            return documentSnapshot.Exists
                ? documentSnapshot.ConvertTo<Estoque>()
                : null;
        }
        public async Task<List<Estoque>> BuscarEstoqueAtualizadoAsync(string versaoAtual)
        {
            var snapshot = await _firestoreDb.Collection("estoque")
                .WhereGreaterThan("Versao", versaoAtual)
                .GetSnapshotAsync();

            return snapshot.Documents.Select(doc => doc.ConvertTo<Estoque>()).ToList();
        }
        public async Task<Estoque> UpdateEstoque(string estoqueId, int quantidade)
        {
            var itemEstoque = await FindEstoqueProdutoById(estoqueId);
            if (itemEstoque == null)
                throw new KeyNotFoundException("Produto não encontrado no estoque.");

            itemEstoque.QuantidadeDisponivel += quantidade;
            itemEstoque.DataUltimaAtualizacao = DateTime.UtcNow;
            itemEstoque.Versao = Guid.NewGuid().ToString(); // Atualiza versão

            await _firestoreDb.Collection("estoque").Document(estoqueId).SetAsync(itemEstoque);
            return itemEstoque;
        }

        public async Task UpdateFieldsInAllDocuments(Dictionary<string, object> fieldsToUpdate, string userRole)
        {
            if (userRole != "admin")
                throw new UnauthorizedAccessException("Operação permitida apenas para administradores.");

            var snapshot = await _firestoreDb.Collection("estoque").GetSnapshotAsync();
            var batch = _firestoreDb.StartBatch();

            foreach (var document in snapshot.Documents)
            {
                batch.Update(document.Reference, fieldsToUpdate);
            }

            await batch.CommitAsync();
        }

        public async Task InicializarEstoqueSeNecessario(string id, string nome, int quantidadeInicial)
        {
            var itemEstoque = await FindEstoqueProdutoById(id);
            Console.WriteLine("Adicionando: " + nome);
            if (itemEstoque == null)
            {
                var novoEstoque = new Estoque
                {
                    IdProduto = id,
                    NomeProduto = nome,
                    QuantidadeDisponivel = quantidadeInicial,
                    DataUltimaAtualizacao = DateTime.UtcNow
                };

                await _firestoreDb.Collection("estoque").Document(id).SetAsync(novoEstoque);
            }
        }

        public async Task<List<Estoque>> ListAllEstoque()
        {
            var snapshot = await _firestoreDb.Collection("estoque").GetSnapshotAsync();

            return snapshot.Documents.Select(doc => doc.ConvertTo<Estoque>()).ToList();
        }

        public async Task SincronizarEstoqueComProdutos(List<Produto> produtos)
        {
            foreach (var produto in produtos)
            {
                Console.WriteLine("Produto: " + produto.Nome);
                foreach (var ingrediente in produto.Ingredientes)
                {
                    Console.WriteLine("Ingrediente: " + ingrediente.Nome);
                    await InicializarEstoqueSeNecessario(ingrediente.Id, ingrediente.Nome, ingrediente.Quantidade);
                }

                if (produto.AdicionaisPossiveis != null)
                {
                    foreach (var adicional in produto.AdicionaisPossiveis)
                    {
                        Console.WriteLine("Adicional: " + adicional.Nome);
                        await InicializarEstoqueSeNecessario(adicional.Id, adicional.Nome, 0);
                    }
                }
            }
        }
    }
}