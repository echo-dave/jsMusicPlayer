import {artwork, changeArtwork} from './audio.js';
const songTitle = document.querySelector('#songTitle');
songTitle.onclick = toggleArtBox;
const incomingArt = new Event('newArt');

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
        artBox.addEventListener('newArt', changeArt);

    } else document.querySelector("#artBox").remove();
}

function closeArtBox () {
    artBox.addEventListener('click', () =>{
        artBox.remove();
    }, {once: true})
}

(function button() {
    document.querySelector('body #main p').insertAdjacentHTML('beforeend',
    `<button onclick='fireArtEvent()'>change art</button>`
    )
})()

 function changeArt() {
    const changeImgSrc = (url)=> document.querySelector('#artBox img').src = url;
    if (artwork.match(/(\/imgs\/helloCat\.jpeg)$/g)) {
        changeArtwork('../imgs/flower.jpg');
        changeImgSrc(artwork);
        console.log('flower');
    }
    else {
        console.log('else');
        changeArtwork('../imgs/helloCat.jpeg');
        changeImgSrc(artwork);
    }
}

window.fireArtEvent = function () {
    document.querySelector('#artBox').dispatchEvent(incomingArt);
    console.log('event fired');
}