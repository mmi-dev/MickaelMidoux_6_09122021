// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const { name, id, portrait, city, country, tagline, price } = data

  const picture = `assets/photographers/thumb/id-photos/${portrait}`

  // creation du code des vignettes des photographes
  function getUserCardDOM() {
    const article = document.createElement('article')
    // photographer page link
    const pagelink = document.createElement('a')
    pagelink.setAttribute('href', `photographer.html?id=${id}`)
    pagelink.setAttribute('aria-label', '')
    // photographer photo
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', `photo de profil de : ${name}`)
    // photographer name
    const h2 = document.createElement('h2')
    h2.textContent = name
    // photographer details
    const details = document.createElement('div')
    // photographer location
    const location = document.createElement('adresse')
    location.setAttribute('class', 'location')
    location.textContent = `${city}, ${country}`
    // photographer slogan
    const slogan = document.createElement('blockquote')
    slogan.setAttribute('class', 'slogan')
    slogan.textContent = tagline
    // photographer price
    const rate = document.createElement('p')
    rate.setAttribute('class', 'rate')
    rate.textContent = `${price}€/jour`
    //  insertion des enfants dans l'élément article
    article.appendChild(pagelink)
    pagelink.appendChild(img)
    pagelink.appendChild(h2)
    article.appendChild(details)
    details.appendChild(location)
    details.appendChild(slogan)
    details.appendChild(rate)
    return article
  }

  // creation du code du header de la page photographe
  function getPhotographerDetailsDOM() {
    // details
    const details = document.createElement('div')
    // name
    const h1 = document.createElement('h1')
    h1.textContent = name
    // location
    const location = document.createElement('adresse')
    location.setAttribute('class', 'location')
    location.textContent = `${city}, ${country}`
    // slogan
    const slogan = document.createElement('blockquote')
    slogan.setAttribute('class', 'slogan')
    slogan.textContent = tagline
    // insertion des enfants dans l'élément détails
    details.appendChild(h1)
    details.appendChild(location)
    details.appendChild(slogan)
    return { details, name }
    // return { details: details, name: name }
  }

  function getPhotographerAvatarDOM() {
    // photo thumbnail
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', `photo de profil de : ${name}`)
    return img
  }
  return {
    name,
    picture,
    getUserCardDOM,
    getPhotographerDetailsDOM,
    getPhotographerAvatarDOM,
  }
}
