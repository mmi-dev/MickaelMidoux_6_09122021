class likedMedia {
    constructor(){
        this._liked = []
        const likeBtn = document.querySelectorAll(".heart")
        let likeNb = document.querySelectorAll(".like-nb")

        likeBtn.forEach((btn) => btn.addEventListener("click", () => {
            this.classList.add("liked")
            this.classList.remove("fa-regular")
            this.classList.add("fa-light")
        }))
    }
    like(media){
        this._liked.push(media)
    }
    unlike(media){
        this._liked = this._liked.filter(med => med !== media)
    }
    
}

async function likeMedia(){

    const likeBtn = document.querySelectorAll(".heart")
        

    likeBtn.forEach((btn) => btn.addEventListener("click", function (){
        // e.preventDefault();
        let likeNb = this.parentElement.getElementsByClassName("likes-nb")[0].innerHTML
        console.log(this.innerHTML)
        // console.log(likeNb.innerHTML)
        if(this.classList.contains("liked")==true){
            this.classList.remove("liked")
            this.innerHTML = this.innerHTML.replace("solid","regular")
            // this.parentElement.getElementsByClassName("likes-nb")[0].classList.remove("inc")
            likeNb = Number(likeNb) - 1
            this.parentElement.getElementsByClassName("likes-nb")[0].innerHTML = likeNb.toString()
        }
        else{
            this.classList.add("liked")
            this.innerHTML = this.innerHTML.replace("regular","solid")
            // this.parentElement.getElementsByClassName("likes-nb")[0].classList.add("inc")
            likeNb = Number(likeNb) + 1
            this.parentElement.getElementsByClassName("likes-nb")[0].innerHTML = likeNb.toString()
        }
    }))

}

