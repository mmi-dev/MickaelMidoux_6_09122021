const formCloseBtn = document.getElementById('close-contact')

// fermeture du formulaire
function closeModal() {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
  document.body.style.overflow = 'auto'
  document.querySelector('.contact_button').focus()
  // eslint-disable-next-line no-use-before-define
  formCloseBtn.removeEventListener('keydown', formKeyboardAction)
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', formCloseOnEscape)
}

// fermature du formulaire avec la touche enter ou space sur le focus du bouton X
function formKeyboardAction(e) {
  switch (e.key) {
    case ' ':
      e.preventDefault()
      closeModal()
      break
    case 'Enter':
      e.preventDefault()
      closeModal()
      break
    default:
  }
}

// fermature du formulaire avec la touche escape
function formCloseOnEscape(e) {
  switch (e.key) {
    case 'Escape':
      e.preventDefault()
      closeModal()
      break
    default:
  }
}

// ouverture du formulaire
// eslint-disable-next-line no-unused-vars
function displayModal() {
  const modal = document.getElementById('contact_modal')
  window.scroll(0, 0)
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
  document.getElementById('prenom').focus()
  formCloseBtn.addEventListener('keydown', formKeyboardAction)
  document.addEventListener('keydown', formCloseOnEscape)
}

// simulation de l'envoie dans la console
// récuoération des données du formulaire
const prenom = document.getElementById('prenom')
const nom = document.getElementById('nom')
const email = document.getElementById('email')
const message = document.getElementById('message')
// const submitBtn = document.getElementById('submitForm')

// affichage des données du formulaire dans la console pour simuler l'envoie
// eslint-disable-next-line no-unused-vars
function formSubmit(e) {
  e.preventDefault()
  // eslint-disable-next-line no-console
  console.log(
    'data: \n',
    `prenom: ${prenom.value}\n`,
    `nom: ${nom.value}\n`,
    `email: ${email.value}\n`,
    `message: ${message.value}\n`
  )

  closeModal()
  return false
}
