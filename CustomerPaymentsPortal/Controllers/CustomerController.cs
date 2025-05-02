using CustomerPaymentsPortal.Data;
using CustomerPaymentsPortal.Dtos;
using CustomerPaymentsPortal.Models;
using CustomerPaymentsPortal.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomerPaymentsPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AuthService _auth;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
            _auth = new AuthService();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _context.Customers.AnyAsync(c => c.Username == dto.Username))
                return BadRequest("Username already exists.");

            _auth.CreatePasswordHash(dto.Password, out byte[] hash, out byte[] salt);

            var customer = new Customer
            {
                FullName = dto.FullName,
                IDNumber = dto.IDNumber,
                AccountNumber = dto.AccountNumber,
                Username = dto.Username,
                PasswordHash = hash,
                PasswordSalt = salt
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return Ok("Registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var customer = await _context.Customers.SingleOrDefaultAsync(c => c.Username == dto.Username && c.AccountNumber == dto.AccountNumber);
            if (customer == null || !_auth.VerifyPasswordHash(dto.Password, customer.PasswordHash, customer.PasswordSalt))
                return Unauthorized("Invalid credentials.");

            return Ok("Login successful.");
        }
    }

}
