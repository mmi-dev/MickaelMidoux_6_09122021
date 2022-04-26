
const filterMenu = document.querySelector(".sort__menu")
const filterBtn = document.querySelector(".sort__menu__btn")
const filterOptions = document.querySelectorAll(".sort__menu__list-option")
const filterList= document.getElementById("sort-option-list")

async function sortMedias(optionElement) {

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
  filterBtn.focus();
  filterBtn.querySelector("span").innerHTML=optionElement.innerHTML
  filterBtn.classList.remove("active")
  filterBtn.setAttribute("aria-expanded","false")
  filterOptions.forEach(options=>{
  options.removeAttribute("hidden")
  })

  optionElement.setAttribute("hidden", true)
  //affiche les medias trié
  const listMedias = await displayMedias(photographerMediassorted); 
  const likedMedias = await likeMedia();
  const lightbox = await lightboxInit();


        // suppression du comportement par default de la touche espace pour action sur les Liens
        const actionOnLink = await keyboardActionOnLink();
}




async function sortMenuInit (){

document.addEventListener('click',function(e){
  // fermeture du menu de tri si on click en dehors
  if(!filterMenu.contains(e.target)){
    filterBtn.classList.remove("active")
    filterBtn.setAttribute("aria-expanded","false")
  }
})

  // keyboard navigation

  let optionsList = filterList //.querySelectorAll('li')
  let optionsLen = filterList.querySelectorAll('li').length -1
  let index = -1

  document.addEventListener('keyup', function(e){
    // fermeture du menu de tri si aucun élément de la liste n'est selectionné
    if(!filterMenu.contains(document.activeElement)){
      filterBtn.classList.remove("active")
      filterBtn.setAttribute('aria-expanded','false')

    }
  })

  filterBtn.addEventListener('keydown', function(e){
    
    // document.body.style.overflow = 'hidden';
    switch (e.key){
      case 'Escape':
        e.preventDefault()
        filterBtn.classList.remove("active")
        filterBtn.setAttribute('aria-expanded','false')

          filterBtn.focus();
          break
      case 'ArrowUp':
        e.preventDefault()
        filterBtn.classList.remove("active")
        filterBtn.setAttribute('aria-expanded','false')

          break
      case 'ArrowDown':
        e.preventDefault()
        if(filterBtn.classList.contains('active')){
          if(optionsList.querySelectorAll('li')[0].hasAttribute('hidden')){
            optionsList.querySelectorAll('li')[1].focus()
            index=1
          }
          else{
            optionsList.querySelectorAll('li')[0].focus()
            index=0
          }
        }else{
          sortMenu(filterBtn)
        }
        
          
          break
    }
  })

  filterOptions.forEach(options=>{
    options.addEventListener('keydown', function(e){
      switch (e.key){
        case 'Enter':
        e.preventDefault()
            document.activeElement.click();
            filterBtn.focus();
            break
            case ' ': // touche espace
            e.preventDefault()
                document.activeElement.click();
                filterBtn.focus();
                break
        case 'Escape':
          e.preventDefault()
            sortMenu(e)
            filterBtn.focus();
            break
        case 'ArrowUp':
          e.preventDefault()
          if(index == 0){
            
            filterBtn.focus();
            index=-1
          }else if(index == 1 && optionsList.querySelectorAll('li')[0].hasAttribute('hidden')){
            filterBtn.focus();
            index=-1
          }
          else if(optionsList.querySelectorAll('li')[index-1].hasAttribute('hidden')){
            index = index - 2
            optionsList.querySelectorAll('li')[index].focus()
          }else{
            index = index - 1
            optionsList.querySelectorAll('li')[index].focus()
          }
            break
        case 'ArrowDown':
          e.preventDefault()
            if(index == optionsLen){
              
            }else if(index == optionsLen -1 && optionsList.querySelectorAll('li')[index+1].hasAttribute('hidden')){
              
            }
            else if(optionsList.querySelectorAll('li')[index+1].hasAttribute('hidden')){
              index = index + 2
              optionsList.querySelectorAll('li')[index].focus()
            }else{
              index = index + 1
              optionsList.querySelectorAll('li')[index].focus()
            }
            break
      }
    })
  })
}

function sortMenu(e){
  // ouverture ou fermeture du menu des options de tri
  e.classList.toggle('active')
  if(e.getAttribute('aria-expanded')=="true"){
    e.setAttribute('aria-expanded','false')
  }else{
    e.setAttribute('aria-expanded','true')
  }
}