using System.ComponentModel.DataAnnotations;

namespace CustomerPaymentsPortal.Models
{

    public class Payment
    {
        public int PaymentId { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [Required]
        [Range(1, double.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z]{3}$")] // e.g., USD, EUR, ZAR
        public required string Currency { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z\s]{2,30}$")] // e.g., SWIFT
        public required string Provider { get; set; }

        [Required]
        [RegularExpression(@"^\d{10,20}$")] // simple numeric validation
        public required string PayeeAccountNumber { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z0-9]{8,11}$")] // SWIFT Code pattern
        public required string SwiftCode { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public required Customer Customer { get; set; }
    }


}
