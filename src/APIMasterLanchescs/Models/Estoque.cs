<<<<<<< HEAD
﻿using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Estoque
    {
        [FirestoreProperty("idEstoque")]
        public string IdEstoque { get; set; }

        [FirestoreProperty("produtoId")]
        public string ProdutoId { get; set; }

        [FirestoreProperty("quantidadeDisponivel")]
        public int QuantidadeDisponivel { get; set; }

        [FirestoreProperty("unidadeMedida")]
        public string UnidadeMedida { get; set; }

        [FirestoreProperty("dataUltimaAtualizacao")]
=======
﻿namespace APIMasterLanchescs.Models
{
    public class Estoque
    {
        public string IdEstoque { get; set; }
     
        public string ProdutoId { get; set; }
        
        public int QuantidadeDisponivel { get; set; }
        
        public string UnidadeMedida { get; set; }
        
>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
        public DateTime DataUltimaAtualizacao { get; set; }
    }
}
