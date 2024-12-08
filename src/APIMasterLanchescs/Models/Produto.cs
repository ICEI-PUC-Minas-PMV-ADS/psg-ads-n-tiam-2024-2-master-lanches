using Google.Cloud.Firestore;
using System.Collections.Generic;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Produto
    {
        [FirestoreProperty("id")]
        public string Id { get; set; }

        [FirestoreProperty("nome")]
        public string Nome { get; set; }

        [FirestoreProperty("precoUnitario")]
        public double Preco { get; set; }

        [FirestoreProperty("categoriaId")]
        public string CategoriaId { get; set; }

        [FirestoreProperty("imagemUrl")]
        public string ImagemUrl { get; set; }

        [FirestoreProperty("statusDisponibilidade")]
        public bool StatusDisponibilidade { get; set; }

        [FirestoreProperty("ingredientes")]
        public List<Ingrediente> Ingredientes { get; set; }

        [FirestoreProperty("adicionais")]
        public List<Adicional> AdicionaisPossiveis { get; set; }

        [FirestoreProperty("quantidade")]
        public int Quantidade { get; set; }

        public string Versao { get; set; }
    }
}
