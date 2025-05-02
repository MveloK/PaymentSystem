using System.ComponentModel.DataAnnotations;

namespace CustomerPaymentsPortal.Dtos
{
    public class PaymentDto
    {
        [Required]
        [Range(1, double.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z]{3}$")]
        public required string Currency { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z\s]{2,30}$")]
        public required string Provider { get; set; }

        [Required]
        [RegularExpression(@"^\d{10,20}$")]
        public required string PayeeAccountNumber { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z0-9]{8,11}$")]
        public required string SwiftCode { get; set; }

        [Required]
        public required string Username { get; set; }

        [Required]
        public required string AccountNumber { get; set; }
    }

}
