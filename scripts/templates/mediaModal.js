

const btnClose = document.getElementById("lightboxClose");
const lightboxContainer = document.getElementById("lightbox");
document.get
btnClose.addEventListener("click", function(e) {
    lightboxContainer.classList.add("hidden");
    console.log("closed")
});


// window.onload=function(){
//     const mediaLink = document.querySelectorAll(".media__link");
    

//     mediaLink.forEach((lnk) => lnk.addEventListener("click", function(e) {
//         e.preventDefault();
//         lightboxContainer.classList.remove("hidden");
//     }));

    // const likeBtn = document.querySelectorAll(".heart")
        

    //     likeBtn.forEach((btn) => btn.addEventListener("click", function (){
    //         // e.preventDefault();
    //         let likeNb = this.parentElement.getElementsByClassName("likes-nb")[0].innerHTML
    //         console.log(likeNb)
    //         // console.log(likeNb.innerHTML)
    //         if(this.classList.contains("liked")==true){
    //             this.classList.remove("liked")
    //             this.parentElement.getElementsByClassName("likes-nb")[0].classList.remove("inc")
    //             likeNb = Number(likeNb) - 1
    //             this.parentElement.getElementsByClassName("likes-nb")[0].innerHTML = likeNb.toString()
    //         }
    //         else{
    //             this.classList.add("liked")
    //             this.parentElement.getElementsByClassName("likes-nb")[0].classList.add("inc")
    //             likeNb = Number(likeNb) + 1
    //             this.parentElement.getElementsByClassName("likes-nb")[0].innerHTML = likeNb.toString()
    //         }
    //     }))
//};