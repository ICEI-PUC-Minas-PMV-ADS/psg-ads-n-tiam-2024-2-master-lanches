using Google.Cloud.Firestore;

namespace APIMasterLanchescs.Models
{
    [FirestoreData]
    public class Role
    {
        [FirestoreProperty]
        public string Name { get; set; }

        [FirestoreProperty]
        public List<ScreenAccess> AccessibleScreens { get; set; } = new List<ScreenAccess>();
    }

    [FirestoreData]
    public class ScreenAccess
    {
        [FirestoreProperty]
        public string name { get; set; }

        [FirestoreProperty]
        public int level { get; set; }
    }
}