using CustomerPaymentsPortal.Data;
using CustomerPaymentsPortal.Dtos;
using CustomerPaymentsPortal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomerPaymentsPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitPayment([FromBody] PaymentDto dto)
        {
            // Validate user
            var customer = await _context.Customers
                .SingleOrDefaultAsync(c => c.Username == dto.Username && c.AccountNumber == dto.AccountNumber);

            if (customer == null)
                return Unauthorized("Customer not found.");

            // Create payment
            var payment = new Payment
            {
                CustomerId = customer.CustomerId,
                Amount = dto.Amount,
                Currency = dto.Currency.ToUpper(),
                Provider = dto.Provider,
                PayeeAccountNumber = dto.PayeeAccountNumber,
                SwiftCode = dto.SwiftCode.ToUpper(),
                Customer = customer // Fix: Set the required 'Customer' property
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return Ok("Payment submitted successfully.");
        }
        [HttpPost("history")]
        public async Task<IActionResult> GetCustomerPayments([FromBody] CustomerAuthDto dto)
        {
            // Authenticate user
            var customer = await _context.Customers
                .SingleOrDefaultAsync(c => c.Username == dto.Username && c.AccountNumber == dto.AccountNumber);

            if (customer == null)
                return Unauthorized("Invalid credentials.");

            var payments = await _context.Payments
                .Where(p => p.CustomerId == customer.CustomerId)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new
                {
                    p.PaymentId,
                    p.Amount,
                    p.Currency,
                    p.Provider,
                    p.PayeeAccountNumber,
                    p.SwiftCode,
                    p.CreatedAt
                })
                .ToListAsync();

            return Ok(payments);
        }

    }

}
