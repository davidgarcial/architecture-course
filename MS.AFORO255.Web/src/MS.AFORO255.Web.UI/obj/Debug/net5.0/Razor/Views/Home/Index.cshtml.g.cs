#pragma checksum "D:\AFORO255\CLASES\2021\52.- MSN - FEB 21\05\MS.AFORO255.Web\src\MS.AFORO255.Web.UI\Views\Home\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "9488f85f9ab692da4aa7f4fa837d633a05beb5c3"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Index), @"mvc.1.0.view", @"/Views/Home/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\AFORO255\CLASES\2021\52.- MSN - FEB 21\05\MS.AFORO255.Web\src\MS.AFORO255.Web.UI\Views\_ViewImports.cshtml"
using MS.AFORO255.Web.UI;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\AFORO255\CLASES\2021\52.- MSN - FEB 21\05\MS.AFORO255.Web\src\MS.AFORO255.Web.UI\Views\_ViewImports.cshtml"
using MS.AFORO255.Web.UI.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"9488f85f9ab692da4aa7f4fa837d633a05beb5c3", @"/Views/Home/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"12ce93c842bd09a484714028b5ce84ae8ef38651", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\AFORO255\CLASES\2021\52.- MSN - FEB 21\05\MS.AFORO255.Web\src\MS.AFORO255.Web.UI\Views\Home\Index.cshtml"
  
    ViewData["Title"] = "Home Page";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<div class=\"item__home\">\r\n    <div class=\"home__title\">\r\n        <h3>HOLA, <b>BIENVENIDOS</b></h3>\r\n    </div>\r\n    <div class=\"home__image\"><img");
            BeginWriteAttribute("src", " src=\"", 192, "\"", 235, 1);
#nullable restore
#line 9 "D:\AFORO255\CLASES\2021\52.- MSN - FEB 21\05\MS.AFORO255.Web\src\MS.AFORO255.Web.UI\Views\Home\Index.cshtml"
WriteAttributeValue("", 198, Url.Content("~/assets/logohome.svg"), 198, 37, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("></div>\r\n</div>\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
