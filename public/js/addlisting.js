const img_upload_field = document.querySelector(".img_upload_field");
const propertyName = document.querySelector("#property_name");
const property_price = document.querySelector("#property_price");
const property_address = document.querySelector("#property_address");
const beds = document.querySelector("#beds_");
const baths = document.querySelector("#baths_");
const lot_size = document.querySelector("#lot_size");
const property__description = document.querySelector("#property__description");
const senior_community = document.querySelector("#senior_community");
const spa_features = document.querySelector("#spa_features");
const special_listings_conditions = document.querySelector(
  "#special_listings_conditions"
);
const property_status = document.querySelector("#property_status");
const view__ = document.querySelector("#view__");
const zoning__ = document.querySelector("#zoning__");
const air_conditining_ = document.querySelector("#air_conditining_");
const common_walls = document.querySelector("#common_walls");
const fireplace_features = document.querySelector("#fireplace_features");
const firepalce_y_n = document.querySelector("#firepalce_y_n");
const furnished__ = document.querySelector("#furnished__");
const heating_y_N = document.querySelector("#heating_y_N");
const laundry_features = document.querySelector("#laundry_features");
const living_area_ = document.querySelector("#living_area_");
const fenching_ = document.querySelector("#fenching_");
const foundation_details_ = document.querySelector("#foundation_details_");
const lot_dimensions_ = document.querySelector("#lot_dimensions_");
const lot_size_area = document.querySelector("#lot_size_area");
const lot_size_units_ = document.querySelector("#lot_size_units_");

const parking_features_ = document.querySelector("#parking_features_");
const total_parking = document.querySelector("#total_parking");
const id__ = document.querySelector("#id__");
const area__ = document.querySelector("#area__");
const country__ = document.querySelector("#country__");
const zip__ = document.querySelector("#zip__");
const style__ = document.querySelector("#style__");

const accessbility__ = document.querySelector("#accessbility__");
const appliances__ = document.querySelector("#appliances__");
const architectural__ = document.querySelector("#architectural__");
const cooling__ = document.querySelector("#cooling__");
const heating__ = document.querySelector("#heating__");
const interior__features = document.querySelector("#interior__features");
const levels__ = document.querySelector("#levels__");
const listing_agent = document.querySelector("#listing_agent");
const listing_agent_state_license = document.querySelector(
  "#listing_agent_state_license"
);
const mls_area__ = document.querySelector("#mls_area__");
const occupancy_description = document.querySelector("#occupancy_description");
const pool_feature = document.querySelector("#pool_feature");

const property_condition_ = document.querySelector("#property_condition_");
const property_type = document.querySelector("#property_type");
const roof = document.querySelector("#roof");
const property_subtype_additional = document.querySelector(
  "#property_subtype_additional"
);
const property_subtype_ = document.querySelector("#property_subtype_");
const form__ = document.querySelector("#form__");
const publishBtn = document.querySelector(".publish-btn");

const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
const close_cover = document.querySelector(".close_cover");
const uploadInput = document.querySelector("#file-input");
const previewContainer = document.querySelector("#preview-container");

// banner upload
bannerImage.addEventListener("change", (e) => {
  uploadBanner();
});
// banner close
close_cover.addEventListener("click", () => {
  closePreview();
});
// close preview function
function closePreview() {
  banner.style.display = "none";
  bannerImage.value = "";
}
// upload banner
function uploadBanner() {
  if (bannerImage.files && bannerImage.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      banner.style.backgroundImage = "url(" + e.target.result + ")";
      banner.style.display = "block";
    };
    reader.readAsDataURL(bannerImage.files[0]);
  }
}
// upload input files
uploadInput.addEventListener("change", (e) => {
  uploadImage(e, "image");
});

// function to remove a preview upload input files
const removePreviewImage = (event) => {
  uploadInput.value = "";
  event.target.parentNode.remove();
};
// upoad input function files
const uploadImage = (e, filetype) => {
  // get the files
  const files = e.target.files;

  // loop through the files and create a preview image for each
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // create an image element for the preview
    const img = document.createElement("img");
    img.classList.add("preview-image");

    // create a close button for the preview
    const closeButton = document.createElement("i");
    closeButton.classList.add("fa-solid", "fa-xmark", "preview-close-button");

    // add an event listener to the close button to remove the corresponding preview image
    closeButton.addEventListener("click", removePreviewImage);

    // add the preview image and close button to the page
    const previewContainerItem = document.createElement("div");
    previewContainerItem.classList.add("preview-container-item");
    previewContainerItem.appendChild(img);
    previewContainerItem.appendChild(closeButton);
    previewContainer.appendChild(previewContainerItem);

    // set the preview image source
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
};
let setBannerImg;
bannerImage.addEventListener("change", function (e) {
  // Get the file
  var file = e.target.files[0];
  // Create a reference to the location in Firebase Storage where the file should be uploaded
  var storageRef = storage.ref().child("images/" + file.name);

  // Upload the file to Firebase Storage
  var uploadTask = storageRef.put(file);

  // Track upload progress
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      // Get the percentage of bytes uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      const progress_cover_container = document.querySelector(
        ".progress_cover_contianer"
      );
      const progressDiv = document.getElementById("progress_cover");
      progress_cover_container.style.display = "block";
      progressDiv.style.width = `${Math.round(progress)}%`;

      progressDiv.innerText =
        "Uploading cover img " + Math.round(progress) + "% done";

      if (progress >= 100) {
        setTimeout(() => {
          progress_cover_container.style.display = "none";
        }, 3000);
      }
    },
    function (error) {
      console.error("Error uploading file:", error);
    },
    function () {
      // Get the download URL of the uploaded file
      storageRef
        .getDownloadURL()
        .then(function (url) {
          setBannerImg = url;
          console.log(setBannerImg);
        })
        .catch(function (error) {
          console.error("Error getting download URL:", error);
        });
    }
  );
});
let uploadedImageUrls = [];
uploadInput.addEventListener("change", (e) => {
  // Loop through the selected files
  for (let i = 0; i < e.target.files.length; i++) {
    const file = e.target.files[i];
    // Upload the file to Firebase Storage
    const storageRef = storage.ref().child("images/" + file.name);
    const uploadTask = storageRef.put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get upload progress as a percentage
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        const progress_img_contianer = document.querySelector(
          ".progress_img_contianer"
        );
        const progressDiv = document.getElementById("progress_property");
        progress_img_contianer.style.display = "block";
        progressDiv.style.width = `${Math.round(progress)}%`;

        progressDiv.innerText =
          "Uploading property img " + Math.round(progress) + "% done";

        if (progress >= 100) {
          setTimeout(() => {
            progress_img_contianer.style.display = "none";
          }, 3000);
        }
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        // Get the download URL of the uploaded file
        storageRef
          .getDownloadURL()
          .then((url) => {
            // Add the image URL to the array
            uploadedImageUrls.push(url);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  }
});

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

form__.addEventListener("submit", (e) => {
  e.preventDefault();
  // generating id
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let propertyNameChecking = propertyName.value.split(" ").join("-");
  function generateRandomId(length) {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // generate a random ID with 8 characters
  let id = generateRandomId(8);

  // setting up docName
  let docName = `${propertyNameChecking}-${id}`;
  let date = new Date(); // for published at info

  //access firstore with db variable;
  db.collection("blogs")
    .doc(docName)
    .set({
      setBannerCover: setBannerImg,
      uploadedImageUrls_: uploadedImageUrls,
      publishedAt: `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`,
      propertyName: propertyName.value,
      property_price: property_price.value,
      property_address: property_address.value,
      beds: beds.value,
      baths: baths.value,
      lot_size: lot_size.value,
      property__description: property__description.value,
      senior_community: senior_community.value,
      spa_features: spa_features.value,
      special_listings_conditions: special_listings_conditions.value,
      property_status: property_status.value,
      view__: view__.value,
      zoning__: zoning__.value,
      air_conditining_: air_conditining_.value,
      common_walls: common_walls.value,
      fireplace_features: fireplace_features.value,
      firepalce_y_n: firepalce_y_n.value,
      furnished__: furnished__.value,
      heating_y_N: heating_y_N.value,
      laundry_features: laundry_features.value,
      living_area_: living_area_.value,
      fenching_: fenching_.value,
      foundation_details_: foundation_details_.value,
      lot_dimensions_: lot_dimensions_.value,
      lot_size_area: lot_size_area.value,
      lot_size_units_: lot_size_units_.value,
      parking_features_: parking_features_.value,
      total_parking: total_parking.value,
      id__: id__.value,
      area__: area__.value,
      country__: country__.value,
      zip__: zip__.value,
      style__: style__.value,
      accessbility__: accessbility__.value,
      appliances__: appliances__.value,
      architectural__: architectural__.value,
      cooling__: cooling__.value,
      heating__: heating__.value,
      interior__features: interior__features.value,
      levels__: levels__.value,
      listing_agent: listing_agent.value,
      listing_agent_state_license: listing_agent_state_license.value,
      mls_area__: mls_area__.value,
      occupancy_description: occupancy_description.value,
      pool_feature: pool_feature.value,
      property_condition_: property_condition_.value,
      property_type: property_type.value,
      roof: roof.value,
      property_subtype_additional: property_subtype_additional.value,
      property_subtype_: property_subtype_.value,
    })
    .then(() => {
      location.href = `/${docName}`;
    })
    .catch((err) => {
      console.error(err);
    });
});
firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    window.location.replace("login.html");
  }
});
