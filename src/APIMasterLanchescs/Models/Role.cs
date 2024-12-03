using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models 
{
    [FirestoreData]
    public class Role
    {
        [FirestoreProperty]
        public string Name { get; set; }

        [FirestoreProperty]
        public List<string> AccessibleScreens { get; set; } = new List<string>();
    }
}