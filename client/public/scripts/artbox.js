const songTitle = document.querySelector('#songTitle');
songTitle.onclick = toggleArtBox;

function toggleArtBox(){
    const player = document.querySelector('#player');

    if (!document.querySelector("#artBox")){
    player.insertAdjacentHTML("afterbegin",
    `
    <div id="artBox" style="width:100%;background:grey">&nbsp;</div>
    `)
    const artBox = document.querySelector("#artBox")
    artBox.style.height = artBox.clientWidth + 'px';
    console.log(`width:  ${artBox.clientWidth}`);

    artBox.addEventListener('click', () =>{
        artBox.remove();
    }, {once: true})

    } else document.querySelector("#artBox").remove();
}