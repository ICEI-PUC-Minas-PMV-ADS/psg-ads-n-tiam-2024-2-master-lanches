﻿using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Endereco
    {
        [FirestoreProperty("idEndereco")]
        public int IdEndereco { get; set; }

        [FirestoreProperty("clienteId")]
        public string ClienteId { get; set; }

        [FirestoreProperty("logradouro")]
        public string Logradouro { get; set; }

        [FirestoreProperty("numero")]
        public string Numero { get; set; }

        [FirestoreProperty("bairro")]
        public string Bairro { get; set; }

        [FirestoreProperty("cidade")]
        public string Cidade { get; set; }

        [FirestoreProperty("cep")]
        public string CEP { get; set; }

        [FirestoreProperty("complemento")]
        public string Complemento { get; set; }
    }
}
