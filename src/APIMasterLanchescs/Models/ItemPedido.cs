namespace APIMasterLanchescs.Models
{
    public class ItemPedido
    {
        public string IdItemPedido { get; set; }
      
        public string PedidoId { get; set; }
        
        public string ProdutoId { get; set; }
        
        public int Quantidade { get; set; }
        
        public decimal PrecoUnitario { get; set; }
    }
}
