const fs = require('fs/promises');

let files;
let musicFiles = [];

module.exports = async (dir)  => {
    if (musicFiles.length === 0) {
    try { 
        files = await fs.readdir(dir,{withFileTypes:true});
        console.log(`files: ${files} \n`);

        files.forEach((file,index) => {
            console.log(`--- \n`, file, `\n ---`);

            if (file.isFile()) {
                musicFiles.push({url: process.env.MUSICDIR_PUBLIC_URL+'/'+file.name,title: file.name.slice(0,-4), id: index})
            }            
        })
    } catch (err) {
    console.error(err);
    }
    }
    console.log(`music ${musicFiles}\n`);
    return musicFiles;


  }
