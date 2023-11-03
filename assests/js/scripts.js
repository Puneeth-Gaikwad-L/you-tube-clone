const sidemenuToggle = document.getElementById("sidemenuToggle");
const sidemenu = document.getElementById("sidebar");
const cardContainer = document.getElementById("cardContainer");

const API_KEY = "AIzaSyAx0p_HzJmxphuiYqt7b8mhIsl_9QcohRs";
const baseUrl = "https://www.googleapis.com/youtube/v3/search"


sidemenuToggle.addEventListener("click", () => {
    sidemenu.classList.toggle("sidebar-toggle");
});

async function getVideos(searchQuery, maxValue) {
    const response = await fetch(`${baseUrl}?key=${API_KEY}&q=${searchQuery}&maxResults=${maxValue}&part=snippet`);
    const data = await response.json();
    console.log(data);
}

getVideos("icc", 50);

function createVideoCard() {
    const card = document.createElement("div");
    card.classList.add("card");

    const thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail");

    const imgTag = document.createElement("img");
    imgTag.src = "./assests/images/image 1.png";
    thumbnail.appendChild(imgTag);

    const duration = document.createElement("div");
    duration.classList.add("duration");
    duration.innerText = "15:00"
    thumbnail.appendChild(duration);

    card.appendChild(thumbnail);

    const videoDesc = document.createElement("div");
    videoDesc.classList.add("desc")
    const channel = document.createElement("div");
    channel.classList.add("channel");

    const channelThumbnail = document.createElement("div");
    channelThumbnail.classList.add("chnlimg-container");
    const img = document.createElement("img");
    img.src = "./assests/images/User-Avatar.png";
    channelThumbnail.appendChild(img);
    channel.appendChild(channelThumbnail);
    videoDesc.appendChild(channel);

    const title = document.createElement("div");
    title.classList.add("title");

    const pTag = document.createElement("p");
    pTag.innerText = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus velit esse fugiat
    laborum blanditiis ratione maxime laudantium minima officia veritatis!`;
    title.appendChild(pTag);

    const chnlNameSec = document.createElement("div");
    const channelName = document.createElement("span");
    channelName.classList.add("channel-name");
    channelName.innerText = "Red Bull Motorsport";
    chnlNameSec.appendChild(channelName);

    const views = document.createElement("span");
    views.classList.add("views");
    views.innerText = `693k views . 9 months ago`;
    chnlNameSec.appendChild(views);
    title.appendChild(chnlNameSec);

    videoDesc.appendChild(title);

    card.appendChild(videoDesc);

    cardContainer.appendChild(card);
}

createVideoCard();
createVideoCard();
createVideoCard();
createVideoCard();
createVideoCard();
createVideoCard();
