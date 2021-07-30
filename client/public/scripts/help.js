document.querySelector('body #main p').insertAdjacentHTML('beforeend',`
<button id="help">Info</button>
`)

document.querySelector('#help').onclick = ()=>{
    if (document.querySelector('#helpModal')) document.querySelector('#helpModal').remove()
    else{
        document.querySelector('body').insertAdjacentHTML('beforeend',`
    <div id='helpModal' style="
    position: absolute;
    top: 50%;
    left: 50%;
    background:grey;
    z-index:2;
    box-shadow: 0 0 1.5em .5em rgba(0,0,0,.5);
    border-radius: .5em;
    transform: translate(-50%, -50%);
    overflow: hidden;
    padding:1em 2em;
    width:90%;
    box-sizing:border-box;
    max-width:300px;
    color:white;">
        <h2>Keyboard controls</h2>
        <ul>
            <li>Spacebar: pause / play</li>
            <li>Alt ArrowUp/Down: volume</li>
            <li>ArrowLeft/Right: previous / next track</li>
        </ul>
        <h2>Artwork</h2>
        <p>Click on the title in the player to get artwork. Close by clicking the artwork or the title again.</p>
        <h2>Continuous Playback</h2>
        <p>Defaults to off you can enable in bottom left corner of player.<p>
    </div>
    `)
    document.querySelector('#helpModal').addEventListener('click',()=>{
        document.querySelector('#helpModal').remove()
    },{once:true});
    }
}

