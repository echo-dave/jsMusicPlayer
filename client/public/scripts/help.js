document.querySelector('body #main p').insertAdjacentHTML('beforeend',`
<button id="help" style="cursor:pointer">Info</button>
`)

document.querySelector('#help').onclick = ()=>{
    if (document.querySelector('#helpModal')) document.querySelector('#helpModal').remove()
    else{
        document.querySelector('body').insertAdjacentHTML('beforeend',`
    <div id='helpModal'>
        <h2>Artwork</h2>
        <p>Click on the title in the player to get artwork. Close by clicking the artwork or the title again.</p>
        <h2>Continuous Playback</h2>
        <p>Defaults to off you can enable in bottom left corner of player.<p>
        <h2>Keyboard controls</h2>
        <ul>
            <li>Spacebar: pause / play</li>
            <li>Alt ArrowUp/Down: volume</li>
            <li>ArrowLeft/Right: previous / next track</li>
        </ul>
    </div>
    `)
    document.querySelector('#helpModal').addEventListener('click',()=>{
        document.querySelector('#helpModal').remove()
    },{once:true});
    }
}

