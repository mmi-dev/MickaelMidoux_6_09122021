function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/id-photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const details = document.createElement( 'div' );
        // details.textContent = "";
        const location = document.createElement( 'p' );
        location.setAttribute("class", "location")
        location.textContent = city+", "+country;
        const slogan = document.createElement( 'p' );
        slogan.setAttribute("class", "slogan")
        slogan.textContent = tagline;
        const rate = document.createElement( 'p' );
        rate.setAttribute("class", "rate")
        rate.textContent = price+"€/jour";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(details);
        details.appendChild(location);
        details.appendChild(slogan);
        details.appendChild(rate);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}