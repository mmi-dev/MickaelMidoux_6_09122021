// id du photographers
const photographerId = new URLSearchParams(document.location.search).get('id')
// eslint-disable-next-line no-unused-vars
let photographerMediasBase = []

// lecture des données du fichier json
async function getData() {
  // récupère les données dans le json
  // eslint-disable-next-line no-undef
  const photographersData = new PhotographersApi('data/photographers.json')
  const photographers = await photographersData.get()

  // // retourne le tableau photographers
  return {
    photographers: [...photographers.photographers],
    medias: [...photographers.media],
  }
}

// création des vignettes de chaque média du photographe
async function displayMedias(medias) {
  const mediasSection = document.querySelector('.medias_section')
  const nbLikes = document.querySelector('.photographer_likes')
  let likesCount = 0
  mediasSection.innerHTML = ''
  nbLikes.innerHTML = ''
  medias.forEach((media) => {
    likesCount += media.likes
    // eslint-disable-next-line no-undef
    const mediaModel = mediaFactory(media)
    const mediaCardDOM = mediaModel.getMediaCardDOM()
    mediasSection.appendChild(mediaCardDOM)
  })
  nbLikes.innerHTML = `<span>${likesCount}</span><i class="fa-solid fa-heart"></i>`
}

// creation du header de la age photographe avec les détails du photographe
async function displayDetails(photographer) {
  const photographerDetails = document.querySelector('.photographer_details')
  const photographerAvatar = document.querySelector('.photographer_avatar')
  const modalTitle = document.getElementById('modal-title')
  const photographerPrice = document.querySelector('.photographer_price')
  photographerPrice.innerHTML = ''
  if (photographer.length === 1) {
    // eslint-disable-next-line no-undef
    const photographerDetailsModel = photographerFactory(photographer[0])
    const photographerDetailsDOM =
      photographerDetailsModel.getPhotographerDetailsDOM().details
    photographerDetails.appendChild(photographerDetailsDOM)
    modalTitle.innerHTML = `${modalTitle.innerHTML}<br>${
      photographerDetailsModel.getPhotographerDetailsDOM().name
    }`
  } else {
    // eslint-disable-next-line no-console
    console.log('photographe non trouvé ???')
  }
  // eslint-disable-next-line no-undef
  const photographerDetailsModel = photographerFactory(photographer[0])
  const photographerAvatarDOM =
    photographerDetailsModel.getPhotographerAvatarDOM()
  photographerAvatar.appendChild(photographerAvatarDOM)
  photographerPrice.innerHTML = `${photographer[0].price}€ / jour`
}

async function init() {
  // ste formulaire action pour retour sur la page
  document.getElementById('contact-form').action = document.location.href

  // Récupère les données des photographes
  const { photographers, medias } = await getData()
  // Filtre les données du photographe
  const photographerDetails = photographers.filter(
    (photographer) => photographer.id.toString() === photographerId
  )

  // set page title
  document.title = `Profile de ${photographerDetails[0].name}`
  // set description bouton contactez-moi
  document
    .querySelector('.contact_button')
    .setAttribute('aria-label', `contactez ${photographerDetails[0].name}`)

  // Filtre les medias du photographe
  const photographerMedias = medias.filter(
    (media) => media.photographerId.toString() === photographerId
  )
  const showDetails = await displayDetails(photographerDetails)
  photographerMedias.sort((a, b) => b.likes - a.likes)
  const listMedias = await displayMedias(photographerMedias)
  // eslint-disable-next-line no-undef
  const likedMedias = await likeMedia()
  // eslint-disable-next-line no-undef
  const lightbox = await lightboxInit()
  // eslint-disable-next-line no-undef
  const sortMenu = await sortMenuInit()
  photographerMediasBase = photographerMedias

  // suppression du comportement par default de la touche espace pour action sur les Liens
  // eslint-disable-next-line no-undef
  const actionOnLink = await keyboardActionOnLink()
  return {
    showDetails,
    listMedias,
    likedMedias,
    lightbox,
    sortMenu,
    actionOnLink,
  }
}

init()
