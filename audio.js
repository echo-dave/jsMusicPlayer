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
    }

    function loadAudio (url, audio) {
        audio = document.querySelector("audio");
        console.log(url);
        audio.src = url;
        if (audio.readyState > 0 ) {
            setPlayheadMax(audio);
        } else {
            audio.addEventListener('loadedmetadata', () => {
                setPlayheadMax(audio);
                setDuration(audio);
            });
        }
    }