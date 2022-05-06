const filterMenu = document.querySelector('.sort__menu')
const filterBtn = document.querySelector('.sort__menu__btn')
const filterOptions = document.querySelectorAll('.sort__menu__list-option')
const filterList = document.getElementById('sort-option-list')

// eslint-disable-next-line no-unused-vars
async function sortMedias(optionElement) {
  // eslint-disable-next-line no-undef
  let photographerMediassorted = [...photographerMediasBase]

  // tri de la liste des médias en fonction de l'option selectionnée
  switch (optionElement.attributes['data-value'].nodeValue) {
    case 'bylikes':
      photographerMediassorted.sort((a, b) => b.likes - a.likes)
      break
    case 'bytitle':
      photographerMediassorted.sort((a, b) => {
        if (a.title < b.title) {
          return -1
        }
        return 1
      })
      break
    case 'bydate':
      photographerMediassorted.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
      break
    default:
      // eslint-disable-next-line no-undef
      photographerMediassorted = photographerMediasBase
  }

  // actualise le menu de tri
  filterBtn.focus()
  filterBtn.querySelector('span').innerHTML = optionElement.innerHTML
  filterBtn.classList.remove('active')
  filterBtn.setAttribute('aria-expanded', 'false')
  filterOptions.forEach((options) => {
    options.removeAttribute('hidden')
  })
  optionElement.setAttribute('hidden', true)

  // affiche les medias trié
  // eslint-disable-next-line no-undef
  const listMedias = await displayMedias(photographerMediassorted)
  // eslint-disable-next-line no-undef
  const likedMedias = await likeMedia()
  // eslint-disable-next-line no-undef
  const lightbox = await lightboxInit()

  // suppression du comportement par default de la touche espace pour action sur les Liens
  // eslint-disable-next-line no-undef
  const actionOnLink = await keyboardActionOnLink()
  return { listMedias, likedMedias, lightbox, actionOnLink }
}

function sortMenu(e) {
  // ouverture ou fermeture du menu des options de tri
  e.classList.toggle('active')
  if (e.getAttribute('aria-expanded') === 'true') {
    e.setAttribute('aria-expanded', 'false')
  } else {
    e.setAttribute('aria-expanded', 'true')
  }
}

// eslint-disable-next-line no-unused-vars
async function sortMenuInit() {
  document.addEventListener('click', (e) => {
    // fermeture du menu de tri si on click en dehors
    if (!filterMenu.contains(e.target)) {
      filterBtn.classList.remove('active')
      filterBtn.setAttribute('aria-expanded', 'false')
    }
  })

  // keyboard navigation

  const optionsList = filterList
  const optionsLen = filterList.querySelectorAll('li').length - 1
  let index = -1

  document.addEventListener('keyup', () => {
    // fermeture du menu de tri si aucun élément de la liste n'est selectionné
    if (!filterMenu.contains(document.activeElement)) {
      filterBtn.classList.remove('active')
      filterBtn.setAttribute('aria-expanded', 'false')
    }
    // gestion de l'index lors de la navigation avec la tabulation dans le menu
    else if (filterMenu.contains(document.activeElement)) {
      for (let i = 0; i < optionsLen + 1; i += 1) {
        if (document.activeElement === optionsList.querySelectorAll('li')[i]) {
          index = i
        }
      }
    }
  })

  filterBtn.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        filterBtn.classList.remove('active')
        filterBtn.setAttribute('aria-expanded', 'false')
        filterBtn.focus()
        break
      case 'ArrowUp':
        e.preventDefault()
        filterBtn.classList.remove('active')
        filterBtn.setAttribute('aria-expanded', 'false')
        break
      case 'ArrowDown':
        e.preventDefault()
        if (filterBtn.classList.contains('active')) {
          if (optionsList.querySelectorAll('li')[0].hasAttribute('hidden')) {
            optionsList.querySelectorAll('li')[1].focus()
            index = 1
          } else {
            optionsList.querySelectorAll('li')[0].focus()
            index = 0
          }
        } else {
          sortMenu(filterBtn)
        }
        break
      default:
    }
  })

  filterOptions.forEach((options) => {
    // keyboard actions
    options.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          document.activeElement.click()
          filterBtn.focus()
          break
        case ' ': // touche espace
          e.preventDefault()
          document.activeElement.click()
          filterBtn.focus()
          break
        case 'Escape':
          e.preventDefault()
          sortMenu(e)
          filterBtn.focus()
          break
        case 'ArrowUp':
          e.preventDefault()
          if (index === 0) {
            filterBtn.focus()
            index = -1
          } else if (
            index === 1 &&
            optionsList.querySelectorAll('li')[0].hasAttribute('hidden')
          ) {
            filterBtn.focus()
            index = -1
          } else if (
            optionsList.querySelectorAll('li')[index - 1].hasAttribute('hidden')
          ) {
            index -= 2
            optionsList.querySelectorAll('li')[index].focus()
          } else {
            index -= 1
            optionsList.querySelectorAll('li')[index].focus()
          }
          break
        case 'ArrowDown':
          e.preventDefault()
          if (index === optionsLen) {
            break
          } else if (
            index === optionsLen - 1 &&
            optionsList.querySelectorAll('li')[index + 1].hasAttribute('hidden')
          ) {
            break
          } else if (
            optionsList.querySelectorAll('li')[index + 1].hasAttribute('hidden')
          ) {
            index += 2
            optionsList.querySelectorAll('li')[index].focus()
          } else {
            index += 1
            optionsList.querySelectorAll('li')[index].focus()
          }
          break
        default:
      }
    })
  })
}
