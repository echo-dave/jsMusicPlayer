let player = document.getElementById('player');
let audio; 


buildPlayer();


function buildPlayer () {
    let song = 
    `<figure>
        <figcaption style="text-align: center; margin-left:-13px;">
            <span id="songTitle">--------</span>
        </figcaption>
        <audio type="audio/mpeg">Your browser can't play this! We need Javascript enabled and a modern browser.</audio>       
        <div id="controls">
            <div id="playPause" class="play"></div>
            <div id="playheadContainer">
                <input type="range" name="playhead" id="playhead" min="0" max="100" step="1" value="0">
                <span id="timeRemaining">0:00</span>
            </div>
            <div id="wrapVolume">
                <input type="range" name="volume" id="volume" min="0" max="1" step=".01" value=".5" >
            </div>
        </div>
       
        
    </figure>`

    player.innerHTML = song;
    
    let playPause = document.querySelector("#playPause");
    playPause.addEventListener("click", () => {
       if (typeof(audio) != "undefined") {
            audio.paused ? startPlay(audio) : stopPlay(audio); 
       } 
    })

}

    let loadAudio =  (url, title) => {
        console.log(url);
        audio = document.querySelector("audio");
        pauseAudio(audio);
        audio.src = url;
        
        //Make sure the listener for the playhead only gets added once
        if (!audio["data-time"]) {
            audio.addEventListener("timeupdate", () => {
                audio["data-time"] = true;
                //move playead with playback
                document.querySelector("#playhead").value = audio.currentTime;
                //calculate time remaining and update
                let remainingTime = audio.duration - audio.currentTime;
                timeRemaining(remainingTime);
        }) 
        }

        //reset the playhead on file change
        document.querySelector("#playhead").value = 0;

        //Make sure we have the needed metadata available before trying to apply title, length of audio
        if (audio.readyState > 0 ) {
            applyAudioMetadata(audio, title)
        } else {
            audio.addEventListener('loadedmetadata', () => {
                applyAudioMetadata(audio, title)
            });
        }
    }

    function setPlayheadMax(audio) {
        let playhead = document.querySelector("#playhead");
        playhead.max =  Math.floor(audio.duration);
        playhead.addEventListener("input", () => {
        setPlayheadTime(audio, playhead);
        })
     }
     
     
     function timeRemaining(remainingTime) {
        let currentRemainingTime = convertSecsToMinutes(remainingTime);
        document.querySelector("#timeRemaining").innerText = `-${currentRemainingTime}`;
     }

     function changeVolume() {
        document.querySelector("audio").volume = volume.value;
    }

    function applyAudioMetadata(audio, title) {
        setPlayheadMax(audio);
        timeRemaining(audio.duration);
        volume.addEventListener('input', () => changeVolume(audio));
        document.querySelector("#songTitle").innerText = title;
        startPlay(audio)
    }

    function setPlayheadTime(audio, playhead) {
        audio.currentTime = playhead.value;
        console.log(`audio duration: ${audio.duration} max scrubber: ${playhead.max}`);
    }

    function pauseAudio(audio) {
        console.log('pauseAudio function');
        stopPlay(audio);  
    }

    function startPlay(audio) {
        audio.play();
        playPause.className = "pause";
        playPause.style.visibility = "visible";
        console.log('now playing');
    }

    function stopPlay(audio) {
        audio.pause();
        playPause.className="play";
        playPause.style.visibility = "visible";
        console.log('now paused');
    }

    function convertSecsToMinutes(input) {
        let minutes = Math.floor(input / 60);
        let secs = Math.floor(input) % 60;
        secs = secs.toString().padStart(2,'0');
        return `${minutes}:${secs}`
    }