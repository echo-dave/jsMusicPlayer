const request = new Request('/api/streamdata',{method: 'post',body: JSON.stringify(trackTitle), headers: {'Content-type': 'arraybuffer'}});
let trackName = 'Essential Flow v3.1 raw.mp3';
const rquestStream = `/api/streamdata/${trackName}`;

let stream = fetch(rquestStream).then(data => data.arrayBuffer()).then(stream => {
    console.log("stream ", stream);
    return stream;
 
})