const btnClose = document.getElementById('lightboxClose')
const btnPrev = document.getElementById('lightboxPrev')
const btnNext = document.getElementById('lightboxNext')
const lightboxWindow = document.getElementById('lightbox')
let lightboxList = [] // liste des media de la lightbox
let mediaIndex = '' // index du media affiché dans la lightbox
let activeMedia = '' // nom du media affiché dans la lightbox

const lightboxMedia = document.querySelector('.lightbox__media')
// eslint-disable-next-line no-unused-vars
const lightboxContainer = document.querySelector('#lightbox__container')

function closeLightbox() {
  lightboxWindow.classList.add('hidden')
  lightboxWindow.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = 'auto'
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', lightboxKeyboardAction)
  document.querySelector(`[data-title='${activeMedia}']`).focus()
}

function createImageElement(url, title, description) {
  lightboxMedia.innerHTML = `<img src="${url}" id="lightbox-media" alt="${description}" aria-live="assertive" aria-label="${description}"><figcaption class="media-title">${title}</figcaption>`
}

function createVideoElement(url, title, description) {
  lightboxMedia.innerHTML = `<video controls autoplay src="${url}" id="lightbox-media" alt="${description}""></video><div id="description" aria-live="assertive" aria-label="${description}"></div><figcaption class="media-title">${title}</figcaption>`
}

function mediaLoad(url, title, type, description) {
  activeMedia = title
  switch (type) {
    case 'image':
      createImageElement(url, title, description)
      break
    case 'video':
      createVideoElement(url, title, description)
      break
    default:
      // eslint-disable-next-line no-console
      console.log('media non pris en charge par la lightbox')
  }
}

function prevMedia() {
  if (mediaIndex === 0) {
    mediaIndex = lightboxList.length - 1
  } else {
    mediaIndex -= 1
  }
  mediaLoad(
    lightboxList[mediaIndex].url,
    lightboxList[mediaIndex].title,
    lightboxList[mediaIndex].type,
    lightboxList[mediaIndex].description
  )
}
function nextMedia() {
  if (mediaIndex === lightboxList.length - 1) {
    mediaIndex = 0
  } else {
    mediaIndex += 1
  }
  mediaLoad(
    lightboxList[mediaIndex].url,
    lightboxList[mediaIndex].title,
    lightboxList[mediaIndex].type,
    lightboxList[mediaIndex].description
  )
}

btnClose.addEventListener('click', () => {
  closeLightbox()
})

btnNext.addEventListener('click', () => {
  nextMedia()
})
btnPrev.addEventListener('click', () => {
  prevMedia()
})

function lightboxKeyboardAction(e) {
  switch (e.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowLeft':
      prevMedia()
      break
    case 'ArrowRight':
      nextMedia()
      break
    default:
  }
}

let linkElement

// eslint-disable-next-line no-unused-vars
async function lightboxInit() {
  lightboxList = [] // liste des media de la lightbox
  const mediaLink = document.querySelectorAll('.media__link')
  // const lightboxMedia = document.getElementById("lightbox__container");

  // creation de la liste des medias
  mediaLink.forEach((lnk) =>
    lightboxList.push({
      url: lnk.href,
      title: lnk.attributes['data-title'].nodeValue,
      type: lnk.attributes['data-lightbox'].nodeValue,
      description: lnk.attributes['data-description'].nodeValue,
    })
  )
  // creation de la liste des url
  const urlList = lightboxList.map((el) => el.url)
  // console.log(lightboxList)

  // surveille la selection d'une image
  mediaLink.forEach((lnk) =>
    lnk.addEventListener('click', (e) => {
      e.preventDefault()
      // on regarde si le click se fait sur l'image ou sur le lien
      switch (e.target.tagName) {
        case 'IMG':
          linkElement = e.target.offsetParent
          break
        case 'A':
          linkElement = e.target
          break

        default:
      }
      mediaLoad(
        linkElement.href,
        linkElement.attributes['data-title'].nodeValue,
        linkElement.attributes['data-lightbox'].nodeValue,
        linkElement.attributes['data-description'].nodeValue
      )

      // recuperation de l'index du media
      mediaIndex = urlList.indexOf(e.target.offsetParent.href)

      // ouverture de la lightbox
      lightboxWindow.classList.remove('hidden')
      lightboxWindow.setAttribute('aria-hidden', 'false')
      document.addEventListener('keydown', lightboxKeyboardAction)
      btnClose.focus()
      document.body.style.overflow = 'hidden'
    })
  )
}
