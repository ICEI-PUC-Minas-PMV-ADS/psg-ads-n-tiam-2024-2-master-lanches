<<<<<<< HEAD
﻿using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class CategoriaProduto
    {
        [FirestoreProperty("id")]
        public string IdCategoria { get; set; }

        [FirestoreProperty("nome")]
        public string Nome { get; set; }

        [FirestoreProperty("descricao")]
=======
﻿namespace APIMasterLanchescs.Models
{
    public class CategoriaProduto
    {
        public string IdCategoria { get; set; }
 
        public string Nome { get; set; }
    
>>>>>>> 54866c0cc72941591972efd00305fdd91ba73824
        public string Descricao { get; set; }
    }
}
