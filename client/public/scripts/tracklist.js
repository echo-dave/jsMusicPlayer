const dir = {dir:'client/public/music/'};
const request = new Request('/api/music',{method: 'post',body: JSON.stringify(dir), headers: {'Content-type': 'application/json'}});

let trackData; 

let trackList = document.querySelector("#trackList");

const buildTracklist = () => { 
    console.log(`request\n`, request);
    fetch(request).then(res => {
        // console.log('status call', res.status, '\n', 'res.result:', res.result, '\n ----\n', 'res',  res.json());
        if (res.status === 200) {
            res.json().then(res => {
                console.log('json res:', res);
            trackData = res;
            trackData.forEach(track => {
                    trackList.insertAdjacentHTML('beforeend',
                    `<h2 class="track" onclick=loadAudio(${track.id})>${track.title}</h2>`
                    )    
            });
        })

        } else {
            throw new Error(`error: ${res.status}`);
        }
    })
}
   

export {buildTracklist, trackData};