let out = document.getElementById('out')
let logout = document.getElementById('logout')
let bg = document.getElementById('bg')
let supplier = document.getElementById('supplier')
let account = document.getElementById('account')

if (logout) {
	logout.addEventListener('click' , () => {
		bg.classList.toggle('active')
		out.classList.toggle('active')
	})
}

if (supplier) {
	supplier.addEventListener('click' , () => {
		supplier.parentElement.classList.toggle('active')
	})
}

if (account) {
	account.addEventListener('click' , () => {
		account.parentElement.classList.toggle('active')
	})
}


