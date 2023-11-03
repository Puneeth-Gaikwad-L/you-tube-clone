const sidemenuToggle = document.getElementById("sidemenuToggle");
const sidemenu = document.getElementById("sidebar");
const cardContainer = document.getElementById("cardContainer");

const API_KEY = "AIzaSyCITVHwZuK-Sdf-K6ynCM_lDnxUB2mITmw";
const baseUrl = "https://www.googleapis.com/youtube/v3"


sidemenuToggle.addEventListener("click", () => {
    sidemenu.classList.toggle("sidebar-toggle");
});

async function getVideos(searchQuery, maxValue) {
    const response = await fetch(`${baseUrl}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxValue}&part=snippet`);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].id.videoId != undefined && data.items[i].snippet.channelId != undefined) {
            try {
                let element = data.items[i];
                const videoStats = await getVideoStats(data.items[i].id.videoId);
                const channellogo = await getChannelLogo(data.items[i].snippet.channelId);
                createVideoCard(element.snippet.title, element.snippet.thumbnails.high.url, element.snippet.channelTitle, videoStats.viewCount, channellogo)
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log("skipped");
        }
    };
}


async function getVideoStats(videId) {
    const response = await fetch(`${baseUrl}/videos?key=${API_KEY}&part=statistics&id=${videId}&part=contentDetails`);
    const data = await response.json();
    console.log(data);
    const result = {
        viewCount: data.items[0].statistics.viewCount,
        likeCount: data.items[0].statistics.likeCount
    }
    return result;
}

async function getChannelLogo(channelId) {
    const response = await fetch(`${baseUrl}/channels?key=${API_KEY}&part=snippet&id=${channelId}`);
    const data = await response.json();
    return data.items[0].snippet.thumbnails.high.url
}

getVideos("", 50);

function createVideoCard(videoTitle, videoThumbnail, channelTitle, viewCount, channelLogo) {
    const card = document.createElement("div");
    card.classList.add("card");

    const thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail");

    const imgTag = document.createElement("img");
    imgTag.src = videoThumbnail;
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
    img.src = channelLogo;
    channelThumbnail.appendChild(img);
    channel.appendChild(channelThumbnail);
    videoDesc.appendChild(channel);

    const title = document.createElement("div");
    title.classList.add("title");

    const pTag = document.createElement("p");
    pTag.innerText = videoTitle;
    title.appendChild(pTag);

    const chnlNameSec = document.createElement("div");
    const channelName = document.createElement("span");
    channelName.classList.add("channel-name");
    channelName.innerText = channelTitle;
    chnlNameSec.appendChild(channelName);

    const views = document.createElement("span");
    views.classList.add("views");
    views.innerText = `${viewCount} . 9 months ago`;
    chnlNameSec.appendChild(views);
    title.appendChild(chnlNameSec);

    videoDesc.appendChild(title);

    card.appendChild(videoDesc);

    cardContainer.appendChild(card);
}
