const fs = require('fs/promises');

let files;
let musicFiles = [];

module.exports = async (dir)  => {
    if (musicFiles.length === 0) {
    try { 
        files = await fs.readdir(dir,{withFileTypes:true});

        files.forEach((file,index) => {
            let ext = file.name.length - file.name.lastIndexOf('.');
            ext = file.name.slice(-4);
            if (file.isFile() && ext === '.mp3') {
                musicFiles.push({url: process.env.MUSICDIR_PUBLIC_URL+'/'+file.name,title: file.name.slice(0,-4), id: index})
            }            
        })
    } catch (err) {
    console.error(err);
    }
    }
    console.log(`music: `, musicFiles);
    return musicFiles;


  }
