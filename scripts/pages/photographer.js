//id du photographers
const photographerId =  new URLSearchParams(document.location.search).get("id")
var photographerMedias = []

async function getData() {
    // récupère les données dans le json
    const photographersData = new PhotographersApi('../data/photographers.json')
    // console.log(photographersData)
    const photographers = await photographersData.get()
    // // retourne le tableau photographers
    // console.log({photographers: [...photographers.photographers], medias: [...photographers.media]})
    return ({photographers: [...photographers.photographers], medias: [...photographers.media]});
};

async function displayMedias(medias) {
    const mediasSection = document.querySelector(".medias_section");

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
    })
};

async function displayDetails(photographer) {
    const photographerDetails = document.querySelector(".photographer_details");
    const photographerAvatar = document.querySelector(".photographer_avatar");
    const modalTitle = document.getElementById("modal-title");
    if(photographer.length==1) {
        const photographerDetailsModel = photographerFactory(photographer[0]);
        const photographerDetailsDOM = photographerDetailsModel.getPhotographerDetailsDOM().details;
        photographerDetails.appendChild(photographerDetailsDOM);
        modalTitle.innerHTML = modalTitle.innerHTML + `<br>`+ photographerDetailsModel.getPhotographerDetailsDOM().name
    // console.log(photographerDetailsDOM);
    }else{
        console.log("photographe non trouvé ???")
    }
    const photographerDetailsModel = photographerFactory(photographer[0]);
    const photographerAvatarDOM = photographerDetailsModel.getPhotographerAvatarDOM();
    photographerAvatar.appendChild(photographerAvatarDOM);




};



async function init() {
    // Récupère les données des photographes
    const { photographers, medias } = await getData();

    // Filtre les données du photographe
    const photographerDetails = photographers.filter(photographer => photographer.id.toString() === photographerId)  
    // Filtre les medias du photographe
    photographerMedias = medias.filter(media => media.photographerId.toString() === photographerId)  
    const showDetails = await displayDetails(photographerDetails);
    const listMedias = await displayMedias(photographerMedias);
    const likedMedias = await likeMedia();
    const lightbox = await lightboxInit();

    
};

init();
