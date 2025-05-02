using System.ComponentModel.DataAnnotations;

namespace CustomerPaymentsPortal.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }

        [Required]
        public required string FullName { get; set; }

        [Required]
        public required string IDNumber { get; set; }

        [Required]
        public required string AccountNumber { get; set; }

        [Required]
        public required string Username { get; set; }

        [Required]
        public required byte[] PasswordHash { get; set; }

        [Required]
        public required byte[] PasswordSalt { get; set; }
    }

}
