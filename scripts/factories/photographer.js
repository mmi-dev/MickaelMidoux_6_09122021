function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/id-photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        // photographer page link
        const pagelink = document.createElement( 'a' );
        pagelink.setAttribute("href", "photographer.html?id="+id);
        // photographer photo
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        // photographer name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        // photographer details
        const details = document.createElement( 'div' );
        // photographer location
        const location = document.createElement( 'adresse' );
        location.setAttribute("class", "location");
        location.textContent = city+", "+country;
        // photographer slogan
        const slogan = document.createElement( 'blockquote' );
        slogan.setAttribute("class", "slogan");
        slogan.textContent = tagline;
        // photographer 
        const rate = document.createElement( 'p' );
        rate.setAttribute("class", "rate");
        rate.textContent = price+"€/jour";
        // 
        article.appendChild(pagelink);
        pagelink.appendChild(img);
        pagelink.appendChild(h2);
        pagelink.appendChild(details);
        details.appendChild(location);
        details.appendChild(slogan);
        details.appendChild(rate);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}