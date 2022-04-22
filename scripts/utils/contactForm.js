function displayModal() {
    const modal = document.getElementById("contact_modal");
    window.scroll(0, 0)
	modal.style.display = "block";
    document.body.style.overflow = 'hidden';
    document.getElementById("prenom").focus()
    formCloseBtn.addEventListener('keyup', formKeyboardAction)
    document.addEventListener('keyup', formCloseOnEscape)
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
    document.querySelector('.contact_button').focus()
    formCloseBtn.removeEventListener('keyup', formKeyboardAction)
    document.removeEventListener('keyup', formCloseOnEscape)
}



const formCloseBtn = document.getElementById("close-contact")

function formKeyboardAction(e){
    switch (e.key){
        case 'Enter':
            closeModal()
    }
}

function formCloseOnEscape(e){
    switch (e.key){
        case 'Escape':
            closeModal()
    }
}

// simulation de l'envoie dans la console

const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitForm");

submitBtn.onsubmit = function(e) {
    e.preventDefault();
    console.log(
        "data: \n", 
        "prenom: " + prenom.value +"\n", 
        "nom: " + nom.value +"\n",
        "email: " + email.value +"\n",
        "message: " + message.value +"\n",
    );
    

}