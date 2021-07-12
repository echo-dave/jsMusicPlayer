const request = new Request('/music',{method: 'get'});
//track {id,title,url,artist} static data set:
let trackData = 
[{id: 1, title: 'World Spin', url: './music/WorldSpin 1.6.mp3', artist:''},
{id: 3, title: 'Falling Sun', url: './music/Falling Sun 1.7.mp3', artist:''}];

let trackList = document.querySelector("#trackList");
// fetch(request).then(res => {
//     if (res.status === 200) {
//         let data = res.data;
//             data.forEach(track => {
//                 trackList.insertAdjacentHTML(beforeEnd,
//                 `<h2 class="track" onclick=loadAudio(${track.id})>${track.title}</h2>`
//                 )    
//         });
//     } else {
//         throw new Error(`error: ${res.status}`);
//     }
// })

const buildTracklist = () => { trackData.forEach((track,index) => {
    trackList.insertAdjacentHTML('beforeend',
    `<h2 class="track" onclick=loadAudio(${index}) data-index="${index})">${track.title}</h2>`
    );
})};
   

export {buildTracklist, trackData};