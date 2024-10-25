namespace APIMasterLanchescs.Models
{
    public class Produto
    {
        public string IdProduto { get; set; }

        public string Nome { get; set; }
        
        public string Descricao { get; set; }
        
        public decimal Preco { get; set; }
        
        public string CategoriaId { get; set; }
        
        public int QuantidadeEstoque { get; set; }
        
        public string ImagemUrl { get; set; }
        
        public bool StatusDisponibilidade { get; set; }
    }
}
