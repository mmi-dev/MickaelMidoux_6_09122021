async function keyboardActionOnLink(){

    const linkElements = document.querySelectorAll("a")

    linkElements.forEach(link=>{
        link.addEventListener('keydown', function(e){
          switch (e.key){
            case 'Enter':
                e.preventDefault()
                document.activeElement.click();
                break
            case ' ': // touche espace
                e.preventDefault()
                document.activeElement.click();
                break
        }
      })
    })

}
