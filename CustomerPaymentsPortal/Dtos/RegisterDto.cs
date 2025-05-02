using System.ComponentModel.DataAnnotations;

namespace CustomerPaymentsPortal.Dtos
{
    public class RegisterDto
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z\s]{2,50}$")]
        public required string FullName { get; set; }

        [Required]
        [RegularExpression(@"^\d{13}$")]
        public required string IDNumber { get; set; }

        [Required]
        [RegularExpression(@"^\d{10,20}$")]
        public required string AccountNumber { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_]{5,20}$")]
        public required string Username { get; set; }

        [Required]
        [MinLength(8)]
        public required string Password { get; set; }
    }

}
