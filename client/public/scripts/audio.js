import {keyboardControlListener} from './keyboardControls.js';
import {buildTracklist, trackData} from './tracklist.js';
import * as scrollingTitle from './scrollingSongTitle.js';

let player = document.getElementById('player');
let currentTrackIndex;
let initializeContext = 0;
let duration;
let audio;
let volume;
//setup audioContext for volume control
let audioCtx = 'beans';
let sourceAudio = {};
let gainNode;
buildPlayer();
buildTracklist();
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
       
        
    </figure>
    <span id='contextTime'></span>`

    player.innerHTML = jsMusicPlayer;

    audio = document.querySelector("audio")
    volume = document.querySelector("#volume");
    volume.addEventListener('input', () => changeVolume(audio));
    let playPause = document.querySelector("#playPause");
    playPause.addEventListener("click", () => {
    togglePlay(); 
})

    
}
    async function loadAudio(id) {
        let title = trackData[id].title;

        if (initializeContext === 0) {   
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext({
                latencyHint: 'playback',
                sampleRate: 48000
            });        
            initializeContext = 1;
        }
        audioCtx.onstatechange = () => console.log(audioCtx.state);
        audioCtx.resume();

        const rquestStream = `/api/streamdata/${title}.mp3`;
        const data = await fetch(rquestStream)
        const stream = await data.arrayBuffer()
        console.log("stream ", stream);
    
        const buffer = await audioCtx.decodeAudioData(stream);
        sourceAudio = audioCtx.createBufferSource();
        sourceAudio.buffer = buffer;
        duration = buffer.duration;
        console.log('song duration', duration);
        console.log('buff:\n', sourceAudio);
        gainNode = audioCtx.createGain();
        gainNode.connect(audioCtx.destination);  
        sourceAudio.connect(gainNode);

        currentTrackIndex = id;

        // stopPlay(audio);

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
        console.log('loaded');
        applyAudioMetadata(audio, title, sourceAudio, audioCtx);
        // if (audio.readyState > 0 ) {
        //     applyAudioMetadata(audio, title)
        // } else {
        //     audio.addEventListener('loadedmetadata', () => applyAudioMetadata(audio, title));
        // }

    }

    window.loadAudio = loadAudio;

    function setPlayheadMax(audio) {
        const playhead = document.querySelector("#playhead");
        playhead.max =  Math.floor(audio.duration);
        playhead.addEventListener("input", () => {
        setPlayheadTime(audio, playhead);
        })
     }
     
     function contextCurrentTime(duration){
        let timestamp = audioCtx.getOutputTimestamp() 
        setInterval(() => {
            // console.log('timestamp ', Math.floor(audioCtx.getOutputTimestamp().contextTime));
            document.querySelector('#contextTime').innerText = Math.floor(audioCtx.getOutputTimestamp().contextTime)
         }, 1000);
     }

     function timeRemaining(remainingTime) {
        let currentRemainingTime = convertSecsToMinutes(remainingTime);
        document.querySelector("#timeRemaining").innerText = `-${currentRemainingTime}`;
     }

     function changeVolume() {
        // document.querySelector("audio").volume = volume.value;
        gainNode.gain.value = document.querySelector("#volume").value; //volume change through audioContext for mobile

    }

    function applyAudioMetadata(audio, title, sourceAudio, audioCtx) {
        setPlayheadMax(audio);
        timeRemaining(audio.duration);
        const songTitle = document.querySelector("#songTitle")
        songTitle.innerText = title;
        const songTitleParrent = document.querySelector('#player figcaption')
        scrollingTitle.scroll(songTitle, songTitleParrent);
        // startPlay(audio, sourceAudio, audioCtx);
        startPlay(audioCtx);
        contextCurrentTime(duration);
        console.log('audioCtx state meteadata: ', audioCtx.state);
        audio.removeEventListener('loadedmetadata', () => applyAudioMetadata(audio, title));

    }

    function setPlayheadTime(audio, playhead) {
        audio.currentTime = playhead.value;
    }

    async function startPlay(audio) {
        console.log('playing');
        console.log('aduioctx ', audioCtx);
        if (audioCtx.state !== "running") {
            audioCtx.resume()
            console.log('resuming audio');
        } else {
            console.log('audio running already');
        }

        // audio.play();
        playPause.className = "pause";
        playPause.style.visibility = "visible";
        console.log('sourceAudio play: ', sourceAudio);
        await sourceAudio.start(0);
        console.log('stated  to resume');
        audioCtx.resume();


    }

    function stopPlay(audio) {
        console.log('sourceAudio stop: ', sourceAudio);
        if (sourceAudio.status = "")
        sourceAudio.stop();
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
        console.log('toggle');
        audioCtx.resume();
        if (buffer.length > 0)  {
            
        }

    //     if (Object.keys(audio).length > 0) {
    //         audio.paused ? startPlay(audio, audioCtx) : stopPlay(audio, audioCtx); 
    //    } else {
    //        loadAudio(0);
    //    }
    }



    export {loadAudio, togglePlay, currentTrackIndex};