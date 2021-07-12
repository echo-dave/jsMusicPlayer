import {keyboardControlListener} from './keyboardControls.js';
import {buildTracklist, trackData} from './tracklist.js';
import scrollingSongTitle from './scrollingSongTitle.js';

let player = document.getElementById('player');
let audio = {};
let currentTrackIndex;
let initializeContext = 0;

//setup audioContext for volume control
let audioCtx;
let sourceAudio = {};
let gainNode;

buildTracklist();
buildPlayer();
keyboardControlListener();

function buildPlayer () {
    let jsMusicPlayer = 
    `<figure>
        <figcaption style="text-align: center;">
            <span id="songTitle">--------</span>
        </figcaption>
        <audio type="audio/mpeg">Your browser can't play this! We need Javascript enabled and a modern browser.</audio>       
        <div id="controls">
            <div id="playPause" class="play"></div>
            <div id="playheadContainer" class="center">
                <input type="range" name="playhead" id="playhead" min="0" max="100" step="1" value="0">
                <span id="timeRemaining">0:00</span>
            </div>
            <div id="wrapVolume">
                <input type="range" name="volume" id="volume" min="0" max="1" step=".01" value="1" >
            </div>
            <div class="controlsBg"></div>

        </div>
       
        
    </figure>`

    player.innerHTML = jsMusicPlayer;
    audio = document.querySelector("audio")

    let volume = document.querySelector("#volume");
    volume.addEventListener('input', () => changeVolume(audio));

    let playPause = document.querySelector("#playPause");
    playPause.addEventListener("click", () => {
      togglePlay(); 
    })
}
    const loadAudio = (id) => {
        const url = trackData[id].url;
        const title = trackData[id].title;
        currentTrackIndex = id;

        audio = document.querySelector("audio");
        stopPlay(audio);
        audio.src = url;
        if (initializeContext === 0) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            gainNode = audioCtx.createGain();
            gainNode.connect(audioCtx.destination);
            sourceAudio = audioCtx.createMediaElementSource(audio);
            sourceAudio.connect(gainNode);
            initializeContext = 1;
        }
       

        
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

    window.loadAudio = loadAudio;

    function setPlayheadMax(audio) {
        const playhead = document.querySelector("#playhead");
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
        // document.querySelector("audio").volume = volume.value;
        gainNode.gain.value = document.querySelector("#volume").value; //volume change through audioContext for mobile

    }

    function applyAudioMetadata(audio, title) {
        setPlayheadMax(audio);
        timeRemaining(audio.duration);
        const songTitle = document.querySelector("#songTitle")
        songTitle.innerText = title;
        scrollingSongTitle(songTitle);
        startPlay(audio);
    }

    function setPlayheadTime(audio, playhead) {
        audio.currentTime = playhead.value;
    }

    function startPlay(audio) {
        audio.play();
        playPause.className = "pause";
        playPause.style.visibility = "visible";
    }

    function stopPlay(audio) {
        audio.pause();
        playPause.className="play";
        playPause.style.visibility = "visible";
    }

    function convertSecsToMinutes(input) {
        const minutes = Math.floor(input / 60);
        let secs = Math.floor(input) % 60;
        secs = secs.toString().padStart(2,'0');
        return `${minutes}:${secs}`
    }

    function togglePlay() {
        if (Object.keys(audio).length > 0) {
            audio.paused ? startPlay(audio) : stopPlay(audio); 
       } else {
           loadAudio(0);
       }
    }

    export {loadAudio, togglePlay, currentTrackIndex};