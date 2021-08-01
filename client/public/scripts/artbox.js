import {artwork} from './audio.js';

const songTitle = document.querySelector('#player figcaption');
songTitle.onclick = toggleArtBox;

const player = document.querySelector('#player');
player.addEventListener('newArt', () => {
    changeArt();
    if (artwork){
        if (!document.body.contains(document.querySelector('#artBox'))) {
        toggleArtBox();
    }} 
    if (!artwork && document.querySelector("#artBox")) toggleArtBox();
});

function toggleArtBox(){
    player.styles = getComputedStyle(player);

    if (!document.querySelector("#artBox")){            
        const body = document.querySelector('body')
        let insertPosition = "";
        //append arbox to bottom of player
        if (player.clientHeight + player.clientWidth < window.innerHeight && player.styles.top !== 'auto') {
            insertPosition = 'beforeend';
            appendArtBoxToPlayer();
        } else if (player.clientHeight + player.clientWidth < window.innerHeight && player.styles.bottom !== 'auto') {
            //append arbox to top of player
            console.log('afterbegin');
            insertPosition  = 'afterbegin';
            appendArtBoxToPlayer();
        } else if (player.clientHeight + player.clientWidth >= window.innerHeight) {
             //use a modal
            console.log('make modal');
            document.querySelector('body').insertAdjacentHTML('beforeend',`
            <div id="artBox" class="artBoxModal" style="height:${window.innerHeight * .9 + 'px'};
            width:${window.innerHeight * .9 + 'px'};">
            <img src="${artwork}" height="100%" width="100%" />
            </div>
            `)
            closeArtBox();
        }
  
        function appendArtBoxToPlayer() {
            let device = "";
            insertPosition === 'beforeend' ? device = 'artBoxDesktop' : device = 'artboxMobile';
            player.insertAdjacentHTML(insertPosition,
            `
            <div id="artBox" class="${device}"><img src=${artwork} width:100% height:100%/></div>
            `)
            const artBox = document.querySelector("#artBox")
            artBox.style.height = artBox.clientWidth + 'px';
            closeArtBox();

        }

    } else document.querySelector("#artBox").remove();
}

function closeArtBox () {
    artBox.addEventListener('click', () =>{
        artBox.remove();
    }, {once: true})
}

 function changeArt() {
     const artBoxImg = document.querySelector('#artBox img');
    if (artBoxImg) {
        // if (artBoxImg.src != artwork) {
            const changeImgSrc = (url)=> document.querySelector('#artBox img').src = url;
            changeImgSrc(artwork);
        // }
    }
}