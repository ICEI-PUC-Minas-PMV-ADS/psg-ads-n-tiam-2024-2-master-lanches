using APIMasterLanchescs.Configs.DbContext;
using APIMasterLanchescs.Models;
using Google.Cloud.Firestore;
using Google.Protobuf.WellKnownTypes;

namespace APIMasterLanchescs.Services
{
    public class ProdutoService
    {
        private readonly FirestoreContext _firestoreContext;
        private readonly EstoqueService _estoqueService;

        public ProdutoService(FirestoreContext firestoreContext, EstoqueService estoqueService)
        {
            _firestoreContext = firestoreContext;
            _estoqueService = estoqueService;
        }

        public async Task SalvarProdutoAsync(Produto produto)
        {
            try
            {
                if (produto == null)
                    throw new ArgumentNullException(nameof(produto));

                produto.Versao = Guid.NewGuid().ToString();
                await _firestoreContext.FirestoreDb.Collection("produto").Document(produto.Id).SetAsync(produto);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao salvar produto: {ex.Message}");
            }
        }

        public async Task SalvarProdutoComEstoqueAsync(Produto produto)
        {
            await SalvarProdutoAsync(produto);
            await _estoqueService.SincronizarEstoqueComProdutos(new List<Produto> { produto });
        }
        public async Task SincronizarEstoqueComProdutos()
        {
            var produtos = await BuscarProdutosAsync();
            await _estoqueService.SincronizarEstoqueComProdutos(produtos);
        }
        public async Task UpProd()
        {
            try
            {
                var produtos = await BuscarProdutosAsync();
                //Produtos e adicionais repetidos
                var leite = new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Leite", PrecoUnitario = 7, Quantidade = 1, Essencial = true };
                var Chantilly = new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Chantilly", Preco = 2 };
                var Calda_Extra = new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Calda Extra", Preco = 3 };
                var Pao = new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Pão", PrecoUnitario = 2, Quantidade = 1, Essencial = true };
                var Carne = new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Carne", PrecoUnitario = 8, Quantidade = 1, Essencial = true };
                var Queijo = new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Queijo", PrecoUnitario = 2, Quantidade = 1, Essencial = false };
                var Queijo_essencial = new Ingrediente { Id = Queijo.Id, Nome = "Queijo", PrecoUnitario = 2, Quantidade = 1, Essencial = true };
                foreach (var produto in produtos)
                {
                    // Atualizar adicionais e ingredientes para cada produto com base no tipo
                    switch (produto.Id)
                    {
                        case "10": // Milkshake
                            produto.Ingredientes = new List<Ingrediente>
                            {
                                new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Chocolate", PrecoUnitario = 8, Quantidade = 1, Essencial = false },
                                leite
                            };
                            produto.AdicionaisPossiveis = new List<Adicional>
                            {
                                Chantilly,
                                Calda_Extra
                            };
                            break;

                        case "2": // Suco de Laranja
                            produto.Ingredientes = new List<Ingrediente>
                            {
                                new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Laranja", PrecoUnitario = 5, Quantidade = 1, Essencial = true }
                            };
                            produto.AdicionaisPossiveis = new List<Adicional>
                            {
                                Chantilly,
                                Calda_Extra
                            };
                            break;

                        case "3": // Hambúrguer Clássico
                            produto.Ingredientes = new List<Ingrediente>
                            {
                                Pao,
                                Carne,
                                Queijo,
                                new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Alface", PrecoUnitario = 1, Quantidade = 1, Essencial = false }
                            };
                            produto.AdicionaisPossiveis = new List<Adicional>
                            {
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Bacon", Preco = 3.5 },
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Ovo", Preco = 2 },
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Molho Especial", Preco = 1.5 }
                            };
                            break;

                        case "6": // Batata Frita
                            produto.Ingredientes = new List<Ingrediente>
                            {
                                new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Batatas", PrecoUnitario = 6, Quantidade = 1, Essencial = true }
                            };
                            produto.AdicionaisPossiveis = new List<Adicional>
                            {
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Molho de Alho", Preco = 1.5 },
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Queijo Ralado", Preco = 2 }
                            };
                            break;

                        case "8": // Brownie
                            produto.Ingredientes = new List<Ingrediente>
                            {
                                new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Chocolate", PrecoUnitario = 7, Quantidade = 1, Essencial = true },
                                new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Farinha", PrecoUnitario = 3, Quantidade = 1, Essencial = true }
                            };
                            produto.AdicionaisPossiveis = new List<Adicional>
                            {
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Granulado", Preco = 1.5 },
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Calda Extra", Preco = 2.5 }
                            };
                            break;
                        case "4": // Cheeseburger
                            produto.Ingredientes = new List<Ingrediente>
                            {
                                Pao,
                                Carne,
                                Queijo_essencial
                            };
                            produto.AdicionaisPossiveis = new List<Adicional>
                            {
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Bacon", Preco = 2.5 },
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Molho Extra", Preco = 1.5 }
                            };
                            break;

                        case "5": // Hambúrguer Vegetariano
                            produto.Ingredientes = new List<Ingrediente>
                            {
                                Pao,
                                new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Grão-de-bico", PrecoUnitario = 6, Quantidade = 1, Essencial = true }
                            };
                            produto.AdicionaisPossiveis = new List<Adicional>
                            {
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Molho Especial", Preco = 2 }
                            };
                            break;

                        case "7": // Anéis de Cebola
                            produto.Ingredientes = new List<Ingrediente>
                            {
                                new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Cebola", PrecoUnitario = 4, Quantidade = 1, Essencial = true }
                            };
                            produto.AdicionaisPossiveis = new List<Adicional>
                            {
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Molho Barbecue", Preco = 1.5 }
                            };
                            break;

                        case "9": // Sorvete
                            produto.Ingredientes = new List<Ingrediente>
                            {
                                new Ingrediente { Id = Guid.NewGuid().ToString(), Nome = "Frutas", PrecoUnitario = 3, Quantidade = 1, Essencial = false },
                                leite
                            };
                            produto.AdicionaisPossiveis = new List<Adicional>
                            {
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Granulado", Preco = 1 },
                                new Adicional { Id = Guid.NewGuid().ToString(), Nome = "Cobertura de Chocolate", Preco = 1.5 }
                            };
                            break;
                    }

                    // Atualizar no Firestore
                    await _firestoreContext.FirestoreDb
                        .Collection("produto")
                        .Document(produto.Id)
                        .SetAsync(produto);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao atualizar produtos: " + ex.Message);
            }
        }

        public async Task<bool> VerificarDisponibilidadeProdutoAsync(string produtoId)
        {
            var produto = await BuscarProdutoPorIdAsync(produtoId);
            var estoque = await _estoqueService.ListAllEstoque();

            return produto.Ingredientes.All(ingrediente =>
                ingrediente.Essencial &&
                estoque.Any(e => e.IdProduto == ingrediente.Id && e.QuantidadeDisponivel >= ingrediente.Quantidade));
        }

        public async Task AtualizarEstoquePosVenda(string produtoId, int quantidade)
        {
            var produto = await BuscarProdutoPorIdAsync(produtoId);

            foreach (var ingrediente in produto.Ingredientes)
            {
                await _estoqueService.UpdateEstoque(ingrediente.Id, -ingrediente.Quantidade * quantidade);
            }
        }


        public async Task<Produto> BuscarProdutoPorIdAsync(string id)
        {
            var documentSnapshot = await _firestoreContext.FirestoreDb.Collection("produto").Document(id).GetSnapshotAsync();
            return documentSnapshot.Exists
                ? documentSnapshot.ConvertTo<Produto>()
                : throw new KeyNotFoundException("Produto não encontrado.");
        }

        public async Task<List<Produto>> BuscarProdutosAsync()
        {
            var snapshot = await _firestoreContext.FirestoreDb.Collection("produto").GetSnapshotAsync();

            return snapshot.Documents.Select(doc => doc.ConvertTo<Produto>()).ToList();
        }
        public async Task<List<Produto>> BuscarProdutosAtualizadosAsync(string versaoAtual)
        {
            var snapshot = await _firestoreContext.FirestoreDb.Collection("produto")
                .WhereGreaterThan("Versao", versaoAtual)
                .GetSnapshotAsync();

            return snapshot.Documents.Select(doc => doc.ConvertTo<Produto>()).ToList();
        }
        public async Task<List<Produto>> BuscarProdutosDisponiveisAsync()
        {
            var produtos = await BuscarProdutosAsync();
            return produtos.Where(p => p.StatusDisponibilidade).ToList();
        }

        public async Task MarcarProdutoComoIndisponivelAsync(string id)
        {
            var produtoRef = _firestoreContext.FirestoreDb.Collection("produto").Document(id);
            var snapshot = await produtoRef.GetSnapshotAsync();

            if (!snapshot.Exists)
                throw new KeyNotFoundException($"Produto com ID {id} não encontrado.");

            await produtoRef.UpdateAsync("statusDisponibilidade", false);
        }

    }
}