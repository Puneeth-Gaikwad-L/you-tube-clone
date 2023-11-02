const sidemenuToggle = document.getElementById("sidemenuToggle");
const sidemenu = document.getElementById("sidebar");
const apiKey = "AIzaSyDkB4Wuq3GM1kYnQfTwTvZV9bXwtpv5Onk";
console.log(apiKey);

sidemenuToggle.addEventListener("click", () => {
    sidemenu.classList.toggle("sidebar-toggle");
 });