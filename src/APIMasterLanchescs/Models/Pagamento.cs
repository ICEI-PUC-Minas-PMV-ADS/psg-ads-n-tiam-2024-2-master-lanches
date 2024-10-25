namespace APIMasterLanchescs.Models
{
    public class Pagamento
    {
        public string IdPagamento { get; set; }
     
        public string PedidoId { get; set; }
        
        public string TipoPagamento { get; set; }
        
        public decimal ValorPago { get; set; }
        
        public decimal Troco { get; set; }
        
        public string StatusPagamento { get; set; }
    }
}
