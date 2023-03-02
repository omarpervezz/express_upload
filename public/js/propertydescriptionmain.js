let blogId = decodeURI(location.pathname.split("/").pop());
const loader = document.querySelectorAll(".loader");
console.log(loader.length);
let docRef = db.collection("blogs").doc(blogId);
for (let x = 0; x < loader.length; x++) {
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        loader[x].style.display = "none";
        setupListings(doc.data());
      } else {
        location.replace("/");
      }
    })
    .catch((error) => {
      // Hide the loader
      loader[x].style.display = "none";
    });
}

const setupListings = (data) => {
  const banner = document.querySelector(".s__banner");
  banner.style.backgroundImage = `url(${data.setBannerCover})`;
  // banner.style.backgroundImage = `url(${data.bannerImage})`;
  const content = document.querySelector(".content");
  const propertyInformation = document.querySelector(
    ".property_description__ .property_information"
  );

  addImg(content, data);
  addDescription(propertyInformation, data);
  const listing_gallery = document.querySelector(".listing_gallery");
  galleryListing(listing_gallery, data);
};

const addImg = (element, data) => {
  data.uploadedImageUrls_.forEach((img) => {
    element.innerHTML += `
  <a
class="elem"
href="${img}"
data-lcl-txt="${data.property_address}"
data-lcl-author="${data.listing_agent}"
data-lcl-thumb="${img}"
>
<span
style="
  background-image: url(${img});
"
></span>
</a>
  `;
  });
};

const addDescription = (element, data) => {
  element.innerHTML = `
  
    <div class="col-12 col-md-9 col-lg-9">
    <div class="row bg-white p-5 mb-5">
      <div class="col-12 col-md-9 col-lg-10">
        <div class="d-flex flex-column">
          <div class="address mb-4">
            <h5 class="property_name_title">
              ${data.propertyName}
            </h5>
          </div>
          <div class="location__ mb-4">
            <i class="fa-solid fa-location-dot"></i>
            <span class="property__address">${data.property_address}</span>
          </div>
          <div class="price mb-4">
            <span>$</span> <span id="property_price">${data.property_price}</span>
          </div>
          <div class="basic_information d-flex flex-row gap-2">
            <div>
              <i class="fa-solid fa-bed"></i>
              <span><b id="beds">${data.beds}</b> Beds</span>
            </div>
            <div>
              <i class="fa-solid fa-bathtub"></i>
              <span><b id="baths">${data.baths}</b> Baths</span>
            </div>
            <div>
              <i class="fa-solid fa-square-root-alt"></i>
              <span>${data.lot_size} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white p-5 mb-5">
      <div class="col-12">
        <div class="description__ d-flex flex-column">
          <h4 class="mb-4 fw-bold">Description</h4>
          <div>
            <p>
              ${data.property__description}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white p-5 mb-5 position-relative">
      <div class="col-12 col-md-7 col-lg-7">
        <div class="detailed_feature d-flex flex-column">
          <h4 class="mb-4 property__attribution">
            PROPERTY ATTRIBUTES
          </h4>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">ID#</span>
            <span>${data.id__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">County</span>
            <span>${data.country__}</span>
          </div>
          <div
          class="d-flex flex-row justify-content-between align-items-center border-bottom"
        >
          <span class="fw-bold">City</span>
          <span>${data.country__}</span>
        </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Area</span>
            <span>${data.area__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Zip</span>
            <span>${data.zip__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Style</span>
            <span>${data.style__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Price</span>
            <div>
              <span>$</span>&nbsp;<span id="property_price"
                >${data.property_price}</span
              >
            </div>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Bedrooms</span>
            <span>${data.beds}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Full Bathrooms</span>
            <span>${data.baths}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Half Bathrooms</span>
            <span>${data.baths}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Sqr Footage</span>
            <span>${data.lot_size}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Size</span>
            <span>${data.lot_size} SqFt</span>
          </div>
          
        </div>
      </div>
    </div>
    <div class="row bg-white p-5 mb-5">
      <div class="col-12 col-md-7 col-lg-7">
        <div class="detailed_feature d-flex flex-column">
          <h4 class="mb-4 property__attribution">Price History</h4>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">2/24/2023</span>
            <div>
              <span>Listed $</span>&nbsp;<span>${data.property_price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white p-5 mb-5">
      <div class="col-12 col-md-7 col-lg-7">
        <div class="general_feature d-flex flex-column">
          <h4 class="mb-4 property__attribution">General Features</h4>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">${data.accessbility__}</span>
            <span>None</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Appliances</span>
            <span>${data.appliances__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Architectural Style</span>
            <span>${data.architectural__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Cooling</span>
            <span>${data.cooling__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Heating</span>
            <span>${data.heating__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Interior Features</span>
            <div>
              <span id="property_price">${data.interior__features}</span>
            </div>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Levels</span>
            <span>${data.levels__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Listing Agent</span>
            <span>${data.listing_agent}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Listing Agent State License</span>
            <span>${data.listing_agent_state_license}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Size Square Feet</span>
            <span>${data.lot_size}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">MLS Area</span>
            <span>${data.mls_area__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Occupancy Description</span>
            <span>${data.occupancy_description}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Pool Features </span>
            <span>${data.pool_feature}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Property Condition</span>
            <span>${data.property_condition_}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Property Sub Type Additional </span>
            <span>${data.property_subtype_additional}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Property SubType</span>
            <span>${data.property_subtype_}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Property Type </span>
            <span>${data.property_type}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Roof </span>
            <span>${data.roof}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Senior Community Y/N </span>
            <span>${data.senior_community}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Spa Features </span>
            <span>${data.spa_features}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Special Listing Conditions </span>
            <span>${data.special_listings_conditions}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Status </span>
            <span>${data.property_status}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">View </span>
            <span>${data.view__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Zoning </span>
            <span>${data.zoning__}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white p-5 mb-5">
      <div class="col-12 col-md-7 col-lg-7">
        <div class="interior_feature d-flex flex-column">
          <h4 class="mb-4 property__attribution">
            Interior Features
          </h4>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Air Conditioning Y/N</span>
            <span>${data.air_conditining_}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Common Walls</span>
            <span>${data.common_walls}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Fireplace Features</span>
            <span>${data.fireplace_features}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Fireplace Y/N</span>
            <span>${data.firepalce_y_n}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Full Baths</span>
            <span>${data.baths}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Furnished Y/N</span>
            <div>
              <span id="property_price">${data.furnished__}</span>
            </div>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Heating Y/N</span>
            <span>${data.heating_y_N}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Laundry Features</span>
            <span>${data.laundry_features}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Total Baths</span>
            <span>${data.baths}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Total Bedrooms</span>
            <span>${data.beds}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white p-5 mb-5">
      <div class="col-12 col-md-7 col-lg-7">
        <div class="exterior_feature d-flex flex-column">
          <h4 class="mb-4 property__attribution">
            Exterior Features
          </h4>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Living Area</span>
            <span>${data.living_area_}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Fencing</span>
            <span>${data.fenching_}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Foundation Details</span>
            <span>${data.foundation_details_}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Dimensions</span>
            <span>${data.lot_dimensions_}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Size Acres</span>
            <span>${data.area__}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Size Area</span>
            <div>
              <span id="property_price">${data.lot_size_area}</span>
            </div>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Size Units</span>
            <span>${data.lot_size_units_}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Parking Features</span>
            <span>${data.parking_features_}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Total Parking</span>
            <span>${data.total_parking}</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Total Bedrooms</span>
            <span>${data.beds}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white p-5 mb-5">
      <div class="col-12">
        <div class="property_video d-flex flex-column">
          <h4 class="mb-5 fw-bold">Video</h4>
          <div class="row">
            <div
              class="col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center"
            >
              <iframe
                width="860"
                height="515"
                src="https://www.youtube.com/embed/mrpiPK8_up0?controls=0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white p-5 mb-5">
      <div class="col-12 gallery_">
        <h4 class="mb-4 fw-bold">Gallery</h4>
        <div
          class="row flex-wrap justify-content-center justify-content-md-start listing_gallery"
        >
        </div>
      </div>
    </div>
  </div>
    
    `;
};
const galleryListing = (element, data) => {
  data.uploadedImageUrls_.forEach((img) => {
    element.innerHTML += `   
    <div class="col-12 col-md-3">
    <img
      src="${img}"
    
    />
  </div>`;
  });
};
// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
