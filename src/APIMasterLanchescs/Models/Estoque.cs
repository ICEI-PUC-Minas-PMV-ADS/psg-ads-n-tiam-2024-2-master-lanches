namespace APIMasterLanchescs.Models
{
    public class Estoque
    {
        public string IdEstoque { get; set; }
     
        public string ProdutoId { get; set; }
        
        public int QuantidadeDisponivel { get; set; }
        
        public string UnidadeMedida { get; set; }
        
        public DateTime DataUltimaAtualizacao { get; set; }
    }
}
