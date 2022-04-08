

const btnClose = document.getElementById("lightboxClose");
const btnPrev = document.getElementById("lightboxPrev");
const btnNext = document.getElementById("lightboxNext");
const lightboxWindow = document.getElementById("lightbox");
let lightboxList = [] //liste des media de la lightbox
let mediaIndex = "" //index du media affiché dans la lightbox

const lightboxMedia = document.querySelector(".lightbox__media");

async function lightboxInit (){
    lightboxList = [] //liste des media de la lightbox
    let mediaLink = document.querySelectorAll(".media__link");
    // const lightboxMedia = document.getElementById("lightbox__container");
    
    
    //creation de la liste des medias
    mediaLink.forEach(lnk => lightboxList.push({"url": lnk.href ,"title": lnk.attributes["data-title"].nodeValue , "type": lnk.attributes["data-lightbox"].nodeValue}))
    mediaLink.forEach(lnk => {console.log(lnk);});
    //creation de la liste des url
    let urlList = lightboxList.map(el => el.url)
    console.log(lightboxList)

    //surveille la selaction d'une image
    mediaLink.forEach((lnk) => lnk.addEventListener("click", function(e) {
        e.preventDefault();
        // chargement de l'image dans la lightbox
        mediaLoad(this.href, this.attributes["data-title"].nodeValue, this.attributes["data-lightbox"].nodeValue)

        //recuperation de l'index du media
        mediaIndex = urlList.indexOf(this.href)
        
        // ouverture de la lightbox
        lightboxWindow.classList.remove("hidden");
        document.body.style.overflow = 'hidden';
    }));
}

btnClose.addEventListener("click", ()=>{closeLightbox()});

function closeLightbox() {
    lightboxWindow.classList.add("hidden");
    document.body.style.overflow = 'auto';
}

btnNext.addEventListener("click", ()=>{nextMedia()})
btnPrev.addEventListener("click", ()=>{prevMedia()})

function prevMedia(){
    if(mediaIndex == 0){
        mediaIndex = lightboxList.length - 1;
    }else{
        mediaIndex = mediaIndex - 1
    }
    console.log(lightboxList[mediaIndex]);
    mediaLoad(lightboxList[mediaIndex].url, lightboxList[mediaIndex].title, lightboxList[mediaIndex].type)
}
function nextMedia(){
    if(mediaIndex == lightboxList.length - 1){
        mediaIndex = 0;
    }else{
        mediaIndex = mediaIndex + 1
    }
    mediaLoad(lightboxList[mediaIndex].url, lightboxList[mediaIndex].title, lightboxList[mediaIndex].type)
}

document.addEventListener('keyup', function(e){
    console.log("touche: "+ e.key)
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
    

})

function mediaLoad (url, title, type){
 switch(type){
     case 'image':
        // console.log('case: image -> ' + type);
        createImageElement(url, title);
        break;
    case 'video':
        // console.log('case: video -> ' + type);
        createVideoElement(url, title);
        break;
    default:
        console.log('media non pris en charge par la lightbox');
 }
}

function createImageElement(url, title){
    lightboxMedia.innerHTML = `<img src="${url}" alt="${title}"><figcaption class="media-title">${title}</figcaption>`
}

function createVideoElement(url, title){
    lightboxMedia.innerHTML = `<video controls autoplay src="${url}" alt="${title}"></video><figcaption class="media-title">${title}</figcaption>`
}