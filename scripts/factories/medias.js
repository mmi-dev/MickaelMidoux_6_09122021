function mediaFactory(data) {
    const {id, title, image, video, likes, photographerId } = data;

    if(image){
        thumbName = image;
    }else{
        thumbName = video.replace('mp4', 'png');
    }
    const thumb =`assets/photographers/thumb/${photographerId}/${thumbName}`;

    let imageUrl = ""
    if(image){imageUrl =`assets/photographers/resized/${photographerId}/${image}`;}
    else if(video){imageUrl =`assets/photographers/${photographerId}/${video}`;}
    // console.log(thumbName);

    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        // media modal link
        const medialink = document.createElement( 'a' );
        medialink.setAttribute("href", imageUrl);        
        medialink.setAttribute("data-title", title);
        medialink.setAttribute("tabindex", "0");   
        if(image){medialink.setAttribute("class", "media__link image");medialink.setAttribute("data-lightbox", "image");}
        else if(video){medialink.setAttribute("class", "media__link video");medialink.setAttribute("data-lightbox", "video");}
        // photo thumbnail
        const img = document.createElement( 'img' );
        img.setAttribute("src", thumb);
        img.setAttribute("alt", title);
        img.setAttribute("class", "thumbnail");
        img.setAttribute("loading", "lazy");
        img.setAttribute("id", id.toString());
        // photo details
        const details = document.createElement( 'div' );
        details.setAttribute("class", "media-details");
        // photo name
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        // photog likes
        const liked = document.createElement( 'div' );
        liked.setAttribute("class", "likes-nb");
        liked.setAttribute("aria-label", "likes");  
        liked.textContent = likes.toString();
        const heart = document.createElement( 'button' );
        heart.setAttribute("class", "heart");
        // heart.setAttribute("tabindex", "0");     
        heart.innerHTML = `<i class="fa-regular fa-heart"></i>`
        // 
        article.appendChild(medialink);
        medialink.appendChild(img);
        article.appendChild(details);
        details.appendChild(h2);
        details.appendChild(liked);
        details.appendChild(heart);
        return (article);
    }

    

 
    return { title, thumb, getMediaCardDOM }
}
