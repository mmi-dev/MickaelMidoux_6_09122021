// eslint-disable-next-line no-unused-vars
async function keyboardActionOnLink() {
  const linkElements = document.querySelectorAll('a') // liste des éléments de lien

  // ouverture du lien avec la touche enter ou space
  linkElements.forEach((link) => {
    link.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          document.activeElement.click()
          break
        case ' ': // touche espace
          e.preventDefault()
          document.activeElement.click()
          break
        default:
      }
    })
  })
}
