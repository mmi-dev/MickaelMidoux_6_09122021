
async function likeMedia(){

    const likeBtn = document.querySelectorAll(".heart")
        

    likeBtn.forEach((btn) => btn.addEventListener("click", function (){
        // e.preventDefault();
        let likeNb = this.parentElement.getElementsByClassName("likes-nb")[0].innerHTML
        let totalLikes = document.querySelector(".photographer_likes span").innerHTML
        // console.log(likeNb.innerHTML)
        if(this.classList.contains("liked")==true){
            this.classList.remove("liked")
            this.innerHTML = this.innerHTML.replace("solid","regular")
            // this.parentElement.getElementsByClassName("likes-nb")[0].classList.remove("inc")
            likeNb = Number(likeNb) - 1
            this.parentElement.getElementsByClassName("likes-nb")[0].innerHTML = likeNb.toString()
            totalLikes = Number(totalLikes) - 1
            document.querySelector(".photographer_likes span").innerHTML = totalLikes.toString()
        }
        else{
            this.classList.add("liked")
            this.innerHTML = this.innerHTML.replace("regular","solid")
            // this.parentElement.getElementsByClassName("likes-nb")[0].classList.add("inc")
            likeNb = Number(likeNb) + 1
            this.parentElement.getElementsByClassName("likes-nb")[0].innerHTML = likeNb.toString()
            totalLikes = Number(totalLikes) + 1
            document.querySelector(".photographer_likes span").innerHTML = totalLikes.toString()
        }
    }))

}

