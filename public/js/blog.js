let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
  if (doc.exists) {
    setupBlog(doc.data());
  } else {
    location.replace("/");
  }
});

const setupBlog = (data) => {
  const banner = document.querySelector(".banner");
  const blogTitle = document.querySelector(".title");
  const titleTag = document.querySelector("title");
  const publish = document.querySelector(".published");
  const listed_by = document.querySelector("#listed_by");

  banner.style.backgroundImage = `url(${data.bannerImage})`;
  listed_by.innerHTML += data.listings;
  titleTag.innerHTML += blogTitle.innerHTML = data.title;
  publish.innerHTML += data.publishedAt;

  const article = document.querySelector(".article");
  addArticle(article, data.article);
};

const addArticle = (ele, data) => {
  data = data.split("\n").filter((item) => item.length);
  // console.log(data);

  data.forEach((item) => {
    //checking for image format
    if (item[0] == "!" && item[1] == "[") {
      let seperator;

      for (let i = 0; i <= item.length; i++) {
        if (
          item[i] == "]" &&
          item[i + 1] == "(" &&
          item[item.length - 1] == ")"
        ) {
          seperator = i;
        }
      }

      let alt = item.slice(2, seperator);
      let src = item.slice(seperator + 2, item.length - 1);
      ele.innerHTML += `
      <section class="question__">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h2>Have a question? Let us know</h2>
            <img src="${src}" alt="${alt}" class="article-image"></img>
          </div>
        </div>
      </div>
      </section>
            `;
    } else {
      ele.innerHTML += `<p>${item}</p>`;
    }
  });
};
