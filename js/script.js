console.log("Lets write Java Script");
let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Pad minutes and seconds with leading zeros if necessary
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
  currFolder = folder;
  let a = await fetch(`${window.location.origin}/${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`${window.location.origin}/${folder}/`)[1]);
    }
  }
  //show all songs in playlist
  let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
  songUL.innerHTML = "";
  for (const song of songs) {
    songUL.innerHTML =songUL.innerHTML +`<li>
                <img class="invert" src="images/music.svg" alt="">
                <div class="info">
                  <div >${song.replaceAll("%20"," ").replaceAll(".mp3","")} </div>
                  <div ></div>
                </div>
                <div class="playnow">
                  <img class="invert" src="images/play.svg" alt="">
                </div></li>`;
  }
  document.querySelector(".playlistname").innerHTML=folder.replace("songs/","")
  //Attach an event listener to each song
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });
  return songs;
}

const playMusic = (track, pause = false) => {
  //let audio = new Audio("/songs/" + track);
  console.log(track.replaceAll("%20"," ").replace(".mp3",""));
  if(track.endsWith('.mp3')){
    currentSong.src = `${window.location.origin}/${currFolder}/${track}`;
  }else{
    currentSong.src = `${window.location.origin}/${currFolder}/${track}.mp3`;
  }
  console.log(currentSong.src);
  console.log(currFolder)
  if (!pause) {
    currentSong.play();
    play.src = "images/pause.svg";
  }
  document.querySelector(".coverimg").src=`${window.location.origin}/${currFolder}/cover.jpeg`;
  document.querySelector(".songinfo").innerHTML = track.replaceAll("%20"," ").replace(".mp3","");
  document.querySelector(".songtime").innerHTML = "00:00/00:00";
};  

async function displayAlbums() {
  let a = await fetch(`${window.location.origin}/songs/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".cardContainer");
  let array=Array.from(anchors)
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/songs/") && !e.href.includes()) {
      let folder = e.href.split("/").slice(-1)[0];
      //get meta data of folder
      let a = await fetch(`${window.location.origin}/songs/${folder}/info.json`);
      let response = await a.json();
      cardContainer.innerHTML =cardContainer.innerHTML +
        `<div data-folder="${folder}" class="card">
              <div class="play">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <img
                src="${window.location.origin}/songs/${folder}/cover.jpeg"
                alt=""
              />
              <h2>${response.title}</h2>
              <p>${response.description}</p>
        </div>`;
    }
  }

  //Load the playlist whenever card is clicked
  Array.from(document.getElementsByClassName("card")).forEach((e) => { 
    e.addEventListener("click", async (item) => {
      songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
      playMusic(songs[0]);
    })
  })
}

async function main() { 
  //get list of all songs
  await getSongs(`songs/devotional`);
  playMusic(songs[0], true);

  //display all the albums on page
  displayAlbums();

  //Attach an event listener to play
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "images/pause.svg";
    } else {
      currentSong.pause();
      play.src = "images/play.svg";
    }
  });
  //listen for time update event
  currentSong.addEventListener("timeupdate", () => {
    // console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".traversed").style.width =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  //Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".traversed").style.width = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  //add an event listener for hamburger
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });
  //add an event listener for close button
  document.querySelector(".close").addEventListener("click", () => {  
    document.querySelector(".left").style.left = "-110%";
  });
  //add an event listener to previous
  previous.addEventListener("click", () => {
    currentSong.pause();
    console.log("previous clicked");
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  //add an event listener to next
  next.addEventListener("click", () => {
    currentSong.pause();
    console.log(currentSong)
    console.log("next clicked");
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    console.log(index)
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  //add an event listener to volume
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
      console.log("setting volume to ", e.target.value, " / 100");
      currentSong.volume = parseInt(e.target.value) / 100;
  });
  
  //add event listener to mute the track
  document.querySelector(".volume>img").addEventListener("click",e=>{
    if(e.target.src.includes("volume.svg")){
      e.target.src=e.target.src.replace("volume.svg","mute.svg");
      currentSong.volume=0;
      document.querySelector(".range").getElementsByTagName("input")[0].value=0;
    }
    else{
      e.target.src=e.target.src.replace("mute.svg","volume.svg");
      currentSong.volume=.10;
      document.querySelector(".range").getElementsByTagName("input")[0].value=10;
    }
  })
}
main();
