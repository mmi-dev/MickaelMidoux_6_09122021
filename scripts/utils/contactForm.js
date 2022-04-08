function displayModal() {
    const modal = document.getElementById("contact_modal");
    window.scroll(0, 0)
	modal.style.display = "block";
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
}

const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitForm");

submitBtn.onclick = function(e) {
    e.preventDefault();
    console.log(
        "data: \n", 
        "prenom: " + prenom.value +"\n", 
        "nom: " + nom.value +"\n",
        "email: " + email.value +"\n",
        "message: " + message.value +"\n",
    );
}