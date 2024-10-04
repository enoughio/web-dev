const Fs = require('fs');

Fs.writeFile("message.txt","hello",a, (err)=>{
    if(err) throw err;
    console.log("file saved");
})


// Fs.readFile('./message.txt', "utf8", (err, data) =>{
//     if(err) throw err;
//     console.log(data);
// } )
