const songTitle = document.querySelector('#songTitle');
songTitle.onclick = toggleArtBox;

function toggleArtBox(){
    const player = document.querySelector('#player');

    if (!document.querySelector("#artBox")){
    player.insertAdjacentHTML("afterbegin",
    `
    <div id="artBox" style="width:100%;height:100%;background:grey"></div>
    `)
    } else document.querySelector("#artBox").remove();
}