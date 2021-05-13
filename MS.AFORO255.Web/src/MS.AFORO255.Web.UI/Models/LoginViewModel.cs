using System.ComponentModel.DataAnnotations;

namespace MS.AFORO255.Web.UI.Models
{
    public class LoginViewModel
    {
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
