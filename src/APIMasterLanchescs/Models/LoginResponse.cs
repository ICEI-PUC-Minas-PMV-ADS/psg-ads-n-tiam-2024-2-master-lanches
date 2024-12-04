namespace APIMasterLanchescs.Models
{
    public class LoginResponse
    {
        public string Token { get; set; }

        public Role Role { get; set; }

        public int UserID { get; set; }
    }
}