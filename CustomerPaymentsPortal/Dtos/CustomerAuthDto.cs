using System.ComponentModel.DataAnnotations;

namespace CustomerPaymentsPortal.Dtos
{
    public class CustomerAuthDto
    {
        [Required]
        public required string Username { get; set; }

        [Required]
        public required string AccountNumber { get; set; }
    }


}
