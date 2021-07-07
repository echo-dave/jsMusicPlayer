let player = document.getElementById('player');
let audio; 

let songName;
let songURL;

buildPlayer();

function buildPlayer () {
    let song = 
    `<figure>
        <figcaption>
            ${typeof songName !== "undefined" ? songName : "no song" }
        </figcaption>
        <audio controls src="${songURL ? songURL : "" }" type="audio/mpeg">Your browser can't play this!</audio>
        <input type="range" name="volume" id="volume" min="0" max="100" step="1" value="100">
        <input type="range" name="playhead" id="playhead" min="0" max="100" step="1" value="0">
        <span id="duration">0:00</span>
        
    </figure>`

    player.innerHTML = song;
    volume = document.getElementById('volume');
    volume.addEventListener('input', () => changeVolume(audio));
    console.log("volume element " + volume.value);
    console.log(`audio element volume ${audio}`);
    }

    function loadAudio (url, audio) {
        console.log(url);
        audio = document.querySelector("audio");
        audio.src = url;
        if (audio.readyState > 0 ) {
            setPlayheadMax(audio);
            setDuration(audio);

        } else {
            audio.addEventListener('loadedmetadata', () => {
                setPlayheadMax(audio);
                setDuration(audio);
            });
        }
    }

    function setPlayheadMax(audio) {
        let playheadMax = document.querySelector("#playhead").max;
        playheadMax =  Math.floor(audio.duration); 
     }
     
     function setDuration(audio) {
         let minutes = Math.floor(audio.duration / 60);
         let secs = Math.floor(audio.duration) % 60;
         secs = secs.toString().padStart(2,'0');
         document.querySelector("#duration").innerText = `${minutes} : ${secs}`;
     }

     function changeVolume(audio) {
         console.log(`changeVolume audio element ${audio}`);
        //audio.volume = volume.value;
    }