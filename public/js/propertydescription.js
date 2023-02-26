let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
  if (doc.exists) {
    setupListings(doc.data());
  } else {
    location.replace("/");
  }
});

const setupListings = (data) => {
  console.log(data);
  const banner = document.querySelector(".s__banner");
  banner.style.backgroundImage = `url(${data.bannerImage})`;
  const content = document.querySelector(".content");
  const propertyInformation = document.querySelector(
    ".property_description__ .property_information"
  );
  addImg(content, data.article);
  addDescription(propertyInformation, data);
};

const addImg = (ele, data) => {
  data = data.split("\n").filter((item) => item.length);

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
            <a
        class="elem"
        href="${src}"
        title="image 1"
        data-lcl-txt="lorem ipsum dolor sit amet"
        data-lcl-author="someone"
        data-lcl-thumb="${src}"
        >
        <span
        style="
            background-image: url(${src});
        "
        ></span>
        </a>
            `;
    } else {
      ele.innerHTML += `<p>${item}</p>`;
    }
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
            <span>$</span><span id="property_price">${data.property_price}</span>
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
            <span class="fw-bold">Garage</span>
            <span>${data.garage__}</span>
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
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Washroom</span>
            <span>3</span>
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
              <span>Listed $</span>&nbsp;<span>1,035,000</span>
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
            <span class="fw-bold">Accessibility</span>
            <span>None</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Appliances</span>
            <span>Microwave</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Architectural Style</span>
            <span>Traditional</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Cooling</span>
            <span>Central Air</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Heating</span>
            <span>Central</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Interior Features</span>
            <div>
              <span id="property_price">Walk-In Closet(s)</span>
            </div>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Levels</span>
            <span>Multi/Split</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Listing Agent</span>
            <span>Tanee McCall - BRE#02142709</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Listing Agent State License</span>
            <span>02142709</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Size Square Feet</span>
            <span>6147</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">MLS Area</span>
            <span>C36 - Metropolitan Southwest</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Occupancy Description</span>
            <span>Vacant</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Pool Features </span>
            <span>None</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Property Condition</span>
            <span>Updated/Remodeled</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Property Sub Type Additional </span>
            <span>Single Family Residence</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Property SubType</span>
            <span>Single Family Residence</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Property Type </span>
            <span>Residential</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Roof </span>
            <span>Composition, Shingle</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Senior Community Y/N </span>
            <span>No</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Spa Features </span>
            <span>None</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Special Listing Conditions </span>
            <span>Standard</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Status </span>
            <span>Active</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">View </span>
            <span>None</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Zoning </span>
            <span>LAR1</span>
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
            <span>Yes</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Common Walls</span>
            <span>No Common Walls</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Fireplace Features</span>
            <span>Family Room, Living Room</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Fireplace Y/N</span>
            <span>Yes</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Full Baths</span>
            <span>3</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Furnished Y/N</span>
            <div>
              <span id="property_price">Unfurnished</span>
            </div>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Heating Y/N</span>
            <span>Yes</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Laundry Features</span>
            <span>TLaundry Room</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Total Baths</span>
            <span>3</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Total Bedrooms</span>
            <span>4</span>
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
            <span>1928</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Fencing</span>
            <span>Brick</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Foundation Details</span>
            <span>Raised</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Dimensions</span>
            <span>46x135</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Size Acres</span>
            <span>0.1411</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Size Area</span>
            <div>
              <span id="property_price">6147</span>
            </div>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Lot Size Units</span>
            <span>Square Feet</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Parking Features</span>
            <span>Door-Multi, Garage</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Total Parking</span>
            <span>2</span>
          </div>
          <div
            class="d-flex flex-row justify-content-between align-items-center border-bottom"
          >
            <span class="fw-bold">Total Bedrooms</span>
            <span>4</span>
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
      <div class="col-12">
        <div class="location__ d-flex flex-column">
          <h4 class="mb-4 fw-bold">Location</h4>
          <div id="map"></div>
        </div>
      </div>
    </div>
    <div class="row bg-white p-5 mb-5">
      <div class="col-12 gallery_">
        <h4 class="mb-4 fw-bold">Gallery</h4>
        <div
          class="row flex-wrap justify-content-center justify-content-md-start"
        >
          <div class="col-12 col-md-3">
            <img
              src="http://themestarz.net/html/zoner/assets/img/properties/property-detail-02.jpg"
              alt="gallery"
            />
          </div>
          <div class="col-12 col-md-3">
            <img
              src="http://themestarz.net/html/zoner/assets/img/properties/property-detail-02.jpg"
              alt="gallery"
            />
          </div>
          <div class="col-12 col-md-3">
            <img
              src="http://themestarz.net/html/zoner/assets/img/properties/property-detail-02.jpg"
              alt="gallery"
            />
          </div>
          <div class="col-12 col-md-3">
            <img
              src="http://themestarz.net/html/zoner/assets/img/properties/property-detail-02.jpg"
              alt="gallery"
            />
          </div>
          <div class="col-12 col-md-3">
            <img
              src="http://themestarz.net/html/zoner/assets/img/properties/property-detail-02.jpg"
              alt="gallery"
            />
          </div>
          <div class="col-12 col-md-3">
            <img
              src="http://themestarz.net/html/zoner/assets/img/properties/property-detail-02.jpg"
              alt="gallery"
            />
          </div>
          <div class="col-12 col-md-3">
            <img
              src="http://themestarz.net/html/zoner/assets/img/properties/property-detail-02.jpg"
              alt="gallery"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
    
    `;
};
