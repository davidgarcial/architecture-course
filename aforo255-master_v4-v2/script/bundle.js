let header_options = document.getElementById('header-options')
let out_session = document.getElementById('out-session')
// let browser_options = document.getElementById('browser-options')


header_options.addEventListener('click' , () => {
	out_session.classList.toggle('active'); 
});



// browser_options.addEventListener('click' , e  => {
// 	const option= e.target
// 	const parent = option.parentElement
// 	const childrens = parent.children.length
// 	console.log(parent)


// 	if (childrens >= 3 ) {
// 		parent.classList.toggle('active') 

// 	} 
// })



// $('.option').on('click', function(){
// 	var t = $(this).parent(),
// 		option_sub = t.find('.option-sub'),
// 		alto = t.find('.option-sub').outerHeight(), 
// 		option_sub__activo =  t.parent().find('.option-sub.act');
// 		console.log(option_sub__activo.data('target'));

// 	if($(this).hasClass('act')){
// 		$(this).removeClass('act');
// 		option_sub.animate({ height:0 },500);
// 		option_sub.removeClass('act');
// 	} else {
// 		$('.option').removeClass('act');
// 		$(this).addClass('act');

// 		option_sub__activo.animate({ height:0 },500);
// 		option_sub__activo.removeClass('act');
// 		option_sub.animate({ height:alto },500, function(){
// 			option_sub.css('height','auto');
// 		});
// 		option_sub.addClass('act');
// 	}
// });




// $(".menu-load").click(function() {
// 	var path = $(this).data("path");
// 	var rootPath = "";
// 	if(path == "credit-list"){
// 		rootPath = "";
// 	}
// 	if(path == "credit-add"){
// 		rootPath = "";
// 	}
// 	if(path == "customer-list"){
// 		rootPath = "";
// 	}
// 	if(path == "customer-add"){
		
// 	}

// 	$(".view-home").load("clientes/listado2.html");

// });

$( document ).ready(function() {
	console.log( "ready!" );
	//toastr.success('Have fun storming the castle!', 'Miracle Max Says')

	toastr.error('I do not think that word means what you think it means.', 'Inconceivable!')
});




