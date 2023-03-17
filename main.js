// filters
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let imgBox = document.querySelector(".img-box");
let img = document.getElementById("img");
// == Dawnload img by canvas == //

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// buttons
let upload = document.getElementById("upload");
let download = document.getElementById("download");
let reset = document.querySelector("span");
function resetValue() {
  img.style.filter = "none";
  ctx.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}
window.onload = () => {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

upload.onchange = (e) => {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";

  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => {
    img.src = file.result;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.style.display = "none";
    };
  };
};
let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", (e) => {
    // img.style.filter = `
    ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value})
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

download.onclick = () => {
  // download.href = img.src
  download.href = canvas.toDataURL("image/.jpg");
  // download.href = canvas.toDataURL();
};
