const recentListed = document.querySelector(".col__1");

db.collection("blogs")
  .limit(3)
  .get()
  .then((blogs) => {
    // hide the loader
    blogs.forEach((blog) => {
      if (blog.id != decodeURI(location.pathname.split("/").pop())) {
        createListing(blog);
      }
    });
  })
  .catch((error) => {
    // Hide the loader
    loader.style.display = "none";
  });

const createListing = (blog) => {
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
