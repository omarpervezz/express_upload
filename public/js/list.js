const recentListed = document.querySelector(".col__1");
const loader = document.querySelector(".loader_container");
let limit = 9; // set the number of documents to fetch at a time
let lastVisible = null; // to keep track of the last visible document

// get the first set of documents
db.collection("blogs")
  .orderBy("publishedAt", "desc")
  .limit(limit)
  .get()
  .then((querySnapshot) => {
    if (querySnapshot.size === 0) {
      // if there are no documents, hide the loader
      loader.style.display = "none";
    } else {
      // hide the loader
      loader.style.display = "none";
      querySnapshot.forEach((doc) => {
        if (doc.id != decodeURI(location.pathname.split("/").pop())) {
          createBlog(doc);
          lastVisible = doc; // set the last visible document
        }
      });

      // load more listings on button click
      document.querySelector("#load-more-btn").addEventListener("click", () => {
        // show the loader
        loader.style.display = "block";

        // fetch the next set of documents
        db.collection("blogs")
          .orderBy("publishedAt", "desc")
          .startAfter(lastVisible)
          .limit(limit)
          .get()
          .then((querySnapshot) => {
            // hide the loader if there are no more documents
            if (querySnapshot.size === 0) {
              loader.style.display = "none";
            } else {
              // hide the loader
              loader.style.display = "none";
              querySnapshot.forEach((doc) => {
                if (doc.id != decodeURI(location.pathname.split("/").pop())) {
                  createBlog(doc);
                  lastVisible = doc; // set the last visible document
                }
              });
            }
          })
          .catch((error) => {
            // hide the loader
            loader.style.display = "none";
          });
      });
    }
  })
  .catch((error) => {
    // hide the loader
    loader.style.display = "none";
  });

const createBlog = (blog) => {
  let data = blog.data();
  recentListed.innerHTML += `
    <a href="/${blog.id}" class="gallery__link">
      <figure class="gallery__thumb">
        <img
          src="${data.setBannerCover}"
          alt="gallery_img"
          class="gallery__image"
        />
        <figcaption class="gallery__caption d-flex justify-content-around">
          <span>$${data.property_price}</span>
          <span>${data.beds} beds</span>
          <span>${data.baths} baths</span>
        </figcaption>
      </figure>
    </a>
  `;
};
