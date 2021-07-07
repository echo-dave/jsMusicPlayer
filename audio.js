let player = document.getElementById('player');
let audio; 


buildPlayer();


function buildPlayer () {
    let song = 
    `<figure>
        <figcaption>
            <span id="songTitle"></span>
        </figcaption>
        <audio controls type="audio/mpeg">Your browser can't play this!</audio>
        <input type="range" name="volume" id="volume" min="0" max="1" step=".01" value=".5">
        <input type="range" name="playhead" id="playhead" min="0" max="100" step="1" value="0">
        <div id="playPause"></div>
        <span id="currentTime">0:00</span>
        <span id="duration">0:00</span>
        
    </figure>`

    player.innerHTML = song;
    
    let playPause = document.querySelector("#playPause");
    playPause.addEventListener("click", () => {
        console.log('clicked');
        audio.paused ? startPlay(audio) : stopPlay(audio);   
    })

}

    let loadAudio =  (url, title) => {
        console.log(url);
        audio = document.querySelector("audio");
        pauseAudio(audio);
        audio.src = url;
        console.log(`this ${this}, title ${title}`);
        
        if (!audio["data-time"]) {
            audio.addEventListener("timeupdate", () => {
            audio["data-time"] = true;
            document.querySelector("#playhead").value = audio.currentTime;
        }) 
        }
        document.querySelector("#playhead").value = 0;
        if (audio.readyState > 0 ) {
            applyAudioMetadata(audio)
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
     
     function setDuration(audio) {
         let minutes = Math.floor(audio.duration / 60);
         let secs = Math.floor(audio.duration) % 60;
         secs = secs.toString().padStart(2,'0');
         document.querySelector("#duration").innerText = `${minutes} : ${secs}`;
     }

     function changeVolume() {
        document.querySelector("audio").volume = volume.value;
    }

    function applyAudioMetadata (audio, title) {
        setPlayheadMax(audio);
        setDuration(audio);
        volume.addEventListener('input', () => changeVolume(audio));
        document.querySelector("#songTitle").innerText = title;
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
        playPause.style.display = "block";
        console.log('now playing');
    }

    function stopPlay(audio) {
        audio.pause();
        playPause.className="play";
        playPause.style.display = "block";
        console.log('now paused');
    }

    