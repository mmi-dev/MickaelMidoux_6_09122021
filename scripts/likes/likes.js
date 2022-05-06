// gestion des likes des médias
// eslint-disable-next-line no-unused-vars
async function likeMedia() {
  const likeBtn = document.querySelectorAll('.heart')

  likeBtn.forEach((btn) =>
    btn.addEventListener('click', function likeUnlike() {
      let likeNb =
        this.parentElement.getElementsByClassName('likes-nb')[0].innerHTML
      let totalLikes = document.querySelector(
        '.photographer_likes span'
      ).innerHTML
      if (this.classList.contains('liked') === true) {
        this.classList.remove('liked')
        const ariaLabel = this.getAttribute('aria-label').replace(
          'disliker',
          'liker'
        )
        this.setAttribute('aria-label', ariaLabel)
        this.innerHTML = this.innerHTML.replace('solid', 'regular')
        likeNb = Number(likeNb) - 1
        this.parentElement.getElementsByClassName('likes-nb')[0].innerHTML =
          likeNb.toString()
        totalLikes = Number(totalLikes) - 1
        document.querySelector('.photographer_likes span').innerHTML =
          totalLikes.toString()
      } else {
        this.classList.add('liked')
        const ariaLabel = this.getAttribute('aria-label').replace(
          'liker',
          'disliker'
        )
        this.setAttribute('aria-label', ariaLabel)
        this.innerHTML = this.innerHTML.replace('regular', 'solid')
        likeNb = Number(likeNb) + 1
        this.parentElement.getElementsByClassName('likes-nb')[0].innerHTML =
          likeNb.toString()
        totalLikes = Number(totalLikes) + 1
        document.querySelector('.photographer_likes span').innerHTML =
          totalLikes.toString()
      }
    })
  )
}
