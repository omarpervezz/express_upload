const articleFeild = document.querySelector(".article");
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
const garage__ = document.querySelector("#garage__");
const washroom__ = document.querySelector("#washroom__");

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

// banner
const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector(".publish-btn");
const uploadInput = document.querySelector("#image-upload");

bannerImage.addEventListener("change", () => {
  uploadImage(bannerImage, "banner");
});

uploadInput.addEventListener("change", () => {
  uploadImage(uploadInput, "image");
});

const uploadImage = (uploadFile, uploadType) => {
  const [file] = uploadFile.files;
  if (file && file.type.includes("image")) {
    const formdata = new FormData();
    formdata.append("image", file);

    fetch("/upload", {
      method: "post",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (uploadType == "image") {
          addImage(data, file.name);
        } else {
          bannerPath = `${location.origin}/${data}`;
          banner.style.backgroundImage = `url("${bannerPath}")`;
        }
      });
  } else {
    alert("upload Image only");
  }
};

const addImage = (imagepath, alt) => {
  let curPos = articleFeild.selectionStart;
  let textToInsert = `\r![${alt}](${imagepath})\r`;
  articleFeild.value =
    articleFeild.value.slice(0, curPos) +
    textToInsert +
    articleFeild.value.slice(curPos);
};

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
  if (articleFeild.value.length && propertyName.value.length) {
    // generating id
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let propertyNameChecking = propertyName.value.split(" ").join("-");
    let id = "";
    for (let i = 0; i < 4; i++) {
      id += letters[Math.floor(Math.random() * letters.length)];
    }

    // setting up docName
    let docName = `${propertyNameChecking}-${id}`;
    let date = new Date(); // for published at info

    //access firstore with db variable;
    db.collection("blogs")
      .doc(docName)
      .set({
        article: articleFeild.value,
        bannerImage: bannerPath,
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
        garage__: garage__.value,
        washroom__: washroom__.value,
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
  }
});
