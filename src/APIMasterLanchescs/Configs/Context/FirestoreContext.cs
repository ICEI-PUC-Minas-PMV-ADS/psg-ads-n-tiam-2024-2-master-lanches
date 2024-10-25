using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Configs.DbContext
{
    public class FirestoreContext
    {
        private readonly FirestoreDb _firestoreDb;

        public FirestoreContext(IConfiguration configuration)
        {
            var firebaseConfigPath = configuration["Firebase:ConfigPath"];

            if (string.IsNullOrEmpty(firebaseConfigPath))
            {
                throw new ArgumentNullException(nameof(firebaseConfigPath), "O caminho para o arquivo de configuração do Firebase não pode ser nulo.");
            }
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", firebaseConfigPath);
            _firestoreDb = FirestoreDb.Create(configuration["Firebase:ProjectId"]);
        }

        public FirestoreDb FirestoreDb => _firestoreDb;
        
        public FirestoreDb GetFirestoreDb()
        {
            return _firestoreDb;
        }
    }
}
