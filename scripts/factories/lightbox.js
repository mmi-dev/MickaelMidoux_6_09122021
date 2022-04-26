

const btnClose = document.getElementById("lightboxClose");
const btnPrev = document.getElementById("lightboxPrev");
const btnNext = document.getElementById("lightboxNext");
const lightboxWindow = document.getElementById("lightbox");
let lightboxList = [] //liste des media de la lightbox
let mediaIndex = "" //index du media affiché dans la lightbox
let activeMedia = "" //nom du media affiché dans la lightbox

const lightboxMedia = document.querySelector(".lightbox__media");
const lightboxContainer = document.querySelector("#lightbox__container");

async function lightboxInit (){
    lightboxList = [] //liste des media de la lightbox
    let mediaLink = document.querySelectorAll(".media__link");
    // const lightboxMedia = document.getElementById("lightbox__container");
    
    
    //creation de la liste des medias
    mediaLink.forEach(lnk => lightboxList.push({"url": lnk.href ,"title": lnk.attributes["data-title"].nodeValue , "type": lnk.attributes["data-lightbox"].nodeValue, "description": lnk.attributes["data-description"].nodeValue}))
    // mediaLink.forEach(lnk => {console.log(lnk);});
    //creation de la liste des url
    let urlList = lightboxList.map(el => el.url)
    // console.log(lightboxList)

    //surveille la selaction d'une image
    mediaLink.forEach((lnk) => lnk.addEventListener("click", function(e) {
        e.preventDefault();
        // chargement de l'image dans la lightbox
        mediaLoad(this.href, this.attributes["data-title"].nodeValue, this.attributes["data-lightbox"].nodeValue, this.attributes["data-description"].nodeValue)

        //recuperation de l'index du media
        mediaIndex = urlList.indexOf(this.href)
        
        // ouverture de la lightbox
        lightboxWindow.classList.remove("hidden");
        lightboxWindow.setAttribute('aria-hidden',"false")
        // document.addEventListener('keydown', (e)=>lightboxKeyboardAction(e))
        document.addEventListener('keydown', lightboxKeyboardAction)
        btnClose.focus()
        document.body.style.overflow = 'hidden';
    }));

}

btnClose.addEventListener("click", ()=>{closeLightbox()});

function closeLightbox() {
    lightboxWindow.classList.add("hidden");
    lightboxWindow.setAttribute('aria-hidden',"true")
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', lightboxKeyboardAction)
    document.querySelector(`[data-title='${activeMedia}']`).focus();
}

btnNext.addEventListener("click", ()=>{nextMedia()})
btnPrev.addEventListener("click", ()=>{prevMedia()})

function prevMedia(){
    if(mediaIndex == 0){
        mediaIndex = lightboxList.length - 1;
    }else{
        mediaIndex = mediaIndex - 1
    }
    mediaLoad(lightboxList[mediaIndex].url, lightboxList[mediaIndex].title, lightboxList[mediaIndex].type, lightboxList[mediaIndex].description )
}
function nextMedia(){
    if(mediaIndex == lightboxList.length - 1){
        mediaIndex = 0;
    }else{
        mediaIndex = mediaIndex + 1
    }
    mediaLoad(lightboxList[mediaIndex].url, lightboxList[mediaIndex].title, lightboxList[mediaIndex].type, lightboxList[mediaIndex].description)
}



function mediaLoad (url, title, type, description){
    activeMedia = title
 switch(type){
     case 'image':
        // console.log('case: image -> ' + type);
        createImageElement(url, title, description);
        break;
    case 'video':
        // console.log('case: video -> ' + type);
        createVideoElement(url, title, description);
        break;
    default:
        console.log('media non pris en charge par la lightbox');
 }
}

function createImageElement(url, title, description){
    lightboxMedia.innerHTML = `<img src="${url}" id="lightbox-media" alt="${description}" aria-live="assertive" aria-label="${description}"><figcaption class="media-title">${title}</figcaption>`
}

function createVideoElement(url, title , description){
    lightboxMedia.innerHTML = `<video controls autoplay src="${url}" id="lightbox-media" alt="${description}""></video><div id="description" aria-live="assertive" aria-label="${description}"></div><figcaption class="media-title">${title}</figcaption>`
}


function lightboxKeyboardAction(e){
    switch (e.key){
        case 'Escape':
            closeLightbox()
            break
        case 'ArrowLeft':
            prevMedia()
            break
        case 'ArrowRight':
            nextMedia()
            break
    }
}