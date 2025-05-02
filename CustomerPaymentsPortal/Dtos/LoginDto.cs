using System.ComponentModel.DataAnnotations;

namespace CustomerPaymentsPortal.Dtos
{
    public class LoginDto
    {
        [Required]
        public required string Username { get; set; }

        [Required]
        public required string AccountNumber { get; set; }

        [Required]
        public required string Password { get; set; }
    }

}
