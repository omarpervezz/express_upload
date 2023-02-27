const recentListed = document.querySelector(".col__1");

db.collection("blogs")
  .limit(3)
  .get()
  .then((blogs) => {
    blogs.forEach((blog) => {
      if (blog.id != decodeURI(location.pathname.split("/").pop())) {
        createBlog(blog);
      }
    });
  });

const createBlog = (blog) => {
  let data = blog.data();
  recentListed.innerHTML += `
  <a href="/${blog.id}" class="gallery__link">
  <figure class="gallery__thumb">
    <img
      src="${data.bannerImage}"
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
