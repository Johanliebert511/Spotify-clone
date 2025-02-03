currSong = new Audio();
let songs;
let currFolder;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
    }

async function getSongs(folder){
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response = await a.text();
    //console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    
    for(let index = 0; index < as.length; index ++){
        const element = as[index];
        if(element.href.endsWith(".mp3"))
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = ""
    for(const song of songs){
        songUL.innerHTML = songUL.innerHTML + `<li> <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div>${decodeURIComponent(song)}</div>
                                <div>Shiro Sagisu</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">    
                            </div> </li>`;
                        }  
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            //console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    }) 
    return songs 
}

const playMusic = (track, pause = false) => {
    currSong.src = `/${currFolder}/` + track
    if(!pause) {
        currSong.play()
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURIComponent(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums(){
    let a = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await a.text();
    //console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let cardContainer = document.querySelector(".cardContainer")
    let anchors = div.getElementsByTagName("a")
    
    let array = Array.from(anchors)
    for(let index = 0; index < array.length; index ++){
        const e = array[index];
        //console.log(e.href)
        if(e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-2)[1]
            let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
            let response = await a.json();
            //console.log(response)
            cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
                        <div class="play">
                            <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                            <svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z"/></svg>
                        </div>
                        <img src="songs/${folder}/cover.jpg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`
        }
    }
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        //console.log(e)
        e.addEventListener("click", async item => {
            //console.log(item, item.currentTarget.dataset)
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
            }
        )}
    )
}

async function main(){
    await getSongs("songs/Brightmood");
    playMusic(songs[0], true)
    await displayAlbums()
   
    play.addEventListener("click", ()=> {
        if(currSong.paused){
            currSong.play();
            play.src = "img/pause.svg"    
            }
        else {
            currSong.pause();
            play.src = "img/play.svg"
            }
        })
    currSong.addEventListener("timeupdate", () => {
        //console.log(currSong.currentTime, currSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currSong.currentTime)} 
            / ${secondsToMinutesSeconds(currSong.duration)}`
        document.querySelector(".circle").style.left = (currSong.currentTime / currSong.duration) * 100 + "%"
    })
    
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%"
        currSong.currentTime = ((currSong.duration) * percent) / 100; 
    })

    next.addEventListener("click", () => {
        currSong.pause();
       //console.log("next clicked")
       let index = songs.indexOf(currSong.src.split("/").slice(-1)[0])
       if((index + 1) < songs.length)
            playMusic(songs[index + 1])
    })

    previous.addEventListener("click", () => {
        //console.log("previous clicked")
        let index = songs.indexOf(currSong.src.split("/").slice(-1)[0])
        if((index - 1) >= 0)
            playMusic(songs[index - 1])
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
       // console.log("set volume to", e.target.value)
        currSong.volume = parseInt(e.target.value) / 100
    })

    document.querySelector(".volume>img").addEventListener("click", e => {
        console.log(e.target)
        console.log("changing", e.target.src)
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currSong.volume = 0
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0
            }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currSong.volume = 10
            document.querySelector(".range").getElementsByTagName("input")[0].value = .10
        }
    })

    }
main()
