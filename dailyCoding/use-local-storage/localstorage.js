const select = document.querySelector(".js-select");
const options = document.querySelectorAll("option");
const photo = document.querySelector(".photo");

function viewPhoto() {
  let currentCountry = localStorage.getItem("country");
  function className(name) {
    photo.className = name;
    photo.classList.add("photo");
  }

  if (currentCountry) {
    if (currentCountry === "NONE") {
      className("default");
    } else if (currentCountry === "KR") {
      className("korea");
    } else if (currentCountry === "GR") {
      className("greece");
    } else if (currentCountry === "TR") {
      className("turkey");
    } else if (currentCountry === "FI") {
      className("finland");
    } else {
      className("default");
    }
  }
}

function handleSelect() {
  const country = this.value;
  localStorage.setItem("country", country);
  options[select.selectedIndex].selected = true;
  viewPhoto();
}

function loadCountry() {
  const selected = localStorage.getItem("country");
  if (selected) {
    select.value = selected;
  }
}

loadCountry();
viewPhoto();
select.addEventListener("change", handleSelect);
