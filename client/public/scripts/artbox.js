const songTitle = document.querySelector('#songTitle');
songTitle.onclick = toggleArtBox;

function toggleArtBox(){
    const player = document.querySelector('#player');
    player.styles = getComputedStyle(player);
    console.log('bottom: ' + player.style.bottom);

    if (!document.querySelector("#artBox")){
        console.log('artBox!');
        const body = document.querySelector('body')
        let insertPosition = "";
        //append arbox to bottom of player
        if (player.clientHeight + player.clientWidth < window.innerHeight && player.styles.top !== 'auto') {
            console.log('beforeend');
            insertPosition = 'beforeend';
            appendArtBoxToPlayer();
        }
        //append arbox to top of player
        if (player.clientHeight + player.clientWidth < window.innerHeight && player.styles.bottom !== 'auto') {
            console.log('afterbegin');
            insertPosition  = 'afterbegin';
            appendArtBoxToPlayer();
        }
        //use a modal
        if (player.clientHeight + player.clientWidth >= window.innerHeight) {
            console.log('make modal');
            document.querySelector('body').insertAdjacentHTML('beforeend',`
            <div id="artBox" style="height:${window.innerHeight * .9 + 'px'};
            width:${window.innerHeight * .9 + 'px'};
            position: absolute;
            top: 50%;
            left: 50%;
            background:grey;
            z-index:2;
            box-shadow: 0 0 1.5em .5em rgba(0,0,0,.5);
            border-radius: .5em;
            transform: translate(-50%, -50%);">
            &nbsp
            </div>
            `)
            closeArtBox();
        }


    function appendArtBoxToPlayer() {
        player.insertAdjacentHTML(insertPosition,
        `
        <div id="artBox" style="width:100%;background:grey">&nbsp;</div>
        `)
        const artBox = document.querySelector("#artBox")
        artBox.style.height = artBox.clientWidth + 'px';
        console.log(`width:  ${artBox.clientWidth}`);
        closeArtBox();

    }

    } else document.querySelector("#artBox").remove();
}

function closeArtBox () {
    artBox.addEventListener('click', () =>{
        artBox.remove();
    }, {once: true})
}