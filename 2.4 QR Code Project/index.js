/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';

inquirer
 .prompt([{
        message: 'enter URL',
        name: 'URL',
    }])
 .then((answer)=> {
    var url = answer.URL;
    var qr_svg = qr.image(url);

    qr_svg.pipe(fs.createWriteStream('i_love_qr.svg'));

    fs.writeFile('qr.txt', url, (error)=> {
        if(error) throw error;

        console.log('file saved');
    });
 })
 .catch((error)=> {
    console.log("Please run directly in terminal");
 });