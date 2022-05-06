async function getPhotographers() {
  // récupère les données dans le json
  // eslint-disable-next-line no-undef
  const photographersData = new PhotographersApi('data/photographers.json')
  const photographers = await photographersData.get()
  // // retourne le tableau photographers
  return { photographers: [...photographers.photographers] }
}
// création des vignettes des photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')
  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  // Création des Cards des photographes
  const userCards = await displayData(photographers)
  // suppression du comportement par default de la touche espace pour action sur les Liens
  // eslint-disable-next-line no-undef
  const actionOnLink = await keyboardActionOnLink()
  return { userCards, actionOnLink }
}

init()
