// const filterBy = document.getElementById("sort-select")
// const filterMenu = document.querySelector(".sort__menu")
const filterBtn = document.querySelector(".sort__menu__btn")
const filterOptions = document.querySelectorAll(".sort__menu__list-option")

async function sortMedias(optionElement) {

  // e.preventDefault();
  // console.log(e)

  let photographerMediassorted = [...photographerMediasBase]

  switch (optionElement.attributes['data-value'].nodeValue) {
      case 'bylikes':
          photographerMediassorted.sort(function (a, b) {
          return b.likes - a.likes;
        });
        break;
        case 'bytitle':
          photographerMediassorted.sort(function (a, b) {
          if (a.title < b.title) {
              return -1;
            } else {
              return 1;
            };
      });
      break;
      case 'bydate':
          photographerMediassorted.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
          });
          break;
      default:
          photographerMediassorted = photographerMediasBase
  }

  //actualise le menu de tri
  filterBtn.querySelector("span").innerHTML=optionElement.innerHTML
  filterBtn.classList.remove("active")
  filterOptions.forEach(options=>{
    options.removeAttribute("hidden")
  })
  optionElement.setAttribute("hidden", true)
  //affiche les medias trié
  const listMedias = await displayMedias(photographerMediassorted); 
  const likedMedias = await likeMedia();
  const lightbox = await lightboxInit();
}

