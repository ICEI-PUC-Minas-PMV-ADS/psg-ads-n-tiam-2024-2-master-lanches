namespace APIMasterLanchescs.Models
{
    public class Pedido
    {
        public string IdPedido { get; set; }
        
        public string ClienteId { get; set; }
        
        public decimal ValorTotal { get; set; }
        
        public DateTime DataPedido { get; set; }
        
        public string Status { get; set; }
        
        public Endereco EnderecoEntrega { get; set; }
        
        public string MetodoPagamento { get; set; }
    }
}
