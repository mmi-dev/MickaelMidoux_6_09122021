   import jsonData from './data/photographers.json'
    
    async function getPhotographers() {
        // récupère les données dans le json
        const photographersData = new PhotographersApi(jsonData)
        console.log(photographersData)
        const photographers = await photographersData.get()
        // // retourne le tableau photographers
        console.log({photographers: [...photographers.photographers]})
        return ({photographers: [...photographers.photographers]});
    };

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        console.log(photographers)
        displayData(photographers);
    };
    
    init();
    
