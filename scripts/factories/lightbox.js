const btnClose = document.getElementById("lightboxClose");
const btnPrev = document.getElementById("lightboxPrev");
const btnNext = document.getElementById("lightboxNext");
const lightboxContainer = document.getElementById("lightbox");
let lightboxList = [] //liste des media de la lightbox
let mediaIndex = "" //index du media affiché dans la lightbox

const lightboxMedia = document.getElementById("lightbox__container");

async function lightboxInit (){
    lightboxList = [] //liste des media de la lightbox
    let mediaLink = document.querySelectorAll(".media__link");
    // const lightboxMedia = document.getElementById("lightbox__container");
    
    
    //creation de la liste des medias
    mediaLink.forEach(lnk => lightboxList.push({"url": lnk.href , "type": lnk.attributes["data-lightbox"].nodeValue}))
    //creation de la liste des url
    let urlList = lightboxList.map(el => el.url)
    // console.log(urlList);
    // console.log(lightboxList)

    //surveille la selaction d'une image
    mediaLink.forEach((lnk) => lnk.addEventListener("click", function(e) {
        e.preventDefault();
        // chargement de l'image dans la lightbox
        // console.log(this.attributes["data-lightbox"].nodeValue);
        // console.log(this.parentElement.firstChild.getAttribute["data-lightbox"]);
        mediaLoad(this.href, this.attributes["data-lightbox"].nodeValue)

        //recuperation de l'index du media
        mediaIndex = urlList.indexOf(this.href)
        
        // ouverture de la lightbox
        lightboxContainer.classList.remove("hidden");
    }));
}

btnClose.addEventListener("click", function(e) {
    lightboxContainer.classList.add("hidden");
    console.log("closed")
});


btnPrev.addEventListener("click", function(e) {
    if(mediaIndex == 0){
        mediaIndex = lightboxList.length - 1;
    }else{
        mediaIndex = mediaIndex - 1
    }
    
    mediaLoad(lightboxList[mediaIndex].url, lightboxList[mediaIndex].type)
});


btnNext.addEventListener("click", function(e) {
    if(mediaIndex == lightboxList.length - 1){
        mediaIndex = 0;
    }else{
        mediaIndex = mediaIndex + 1
    }
    
    mediaLoad(lightboxList[mediaIndex].url, lightboxList[mediaIndex].type)
   
});


function mediaLoad (url, type){
 switch(type){
     case 'image':
        console.log('case: image -> ' + type);
        createImageElement(url);
        break;
    case 'video':
        console.log('case: video -> ' + type);
        createVideoElement(url);
        break;
    default:
        console.log('media non pris en charge par la lightbox');
 }
}

function createImageElement(url){
    lightboxMedia.innerHTML = `<img src="${url}">`
}

function createVideoElement(url){
    lightboxMedia.innerHTML = `<video controls autoplay src="${url}"></video>`
}

// class Lightbox {

//     static init() {
//         console.log("init")
//     }

// }

// Lightbox.init()