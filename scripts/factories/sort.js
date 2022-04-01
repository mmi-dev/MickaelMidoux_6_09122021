const filterBy = document.getElementById("sort-select")

// let photographerMediassorted= []


filterBy.onchange = async () => {
    console.log(filterBy.value)

    let photographerMediassorted = [...photographerMediasBase]

    switch (filterBy.value) {
        case 'bylikes':
            console.log(photographerMediassorted.sort(function (a, b) {
            return b.likes - a.likes;
          }));
          break;
          case 'bytitle':
        console.log(photographerMediassorted.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
              } else {
                return 1;
              };
        }));
        break;
        case 'bydate':
        console.log(photographerMediassorted.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
            }));
            break;
        default:
            photographerMediassorted = photographerMediasBase
    }

    const listMedias = await displayMedias(photographerMediassorted);
    const likedMedias = await likeMedia();
    const lightbox = await lightboxInit();
   console.log(photographerMediasBase)
}