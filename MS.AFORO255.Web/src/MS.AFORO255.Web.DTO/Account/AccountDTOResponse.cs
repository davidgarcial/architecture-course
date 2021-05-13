namespace MS.AFORO255.Web.DTO.Account
{
    public class AccountDTOResponse
    {
        public int IdAccount { get; set; }
        public decimal TotalAmount { get; set; }
        public int IdCustomer { get; set; }
        public Customer Customer { get; set; }
    }

    public class Customer
    {
        public int IdCustomer { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
    }
}
