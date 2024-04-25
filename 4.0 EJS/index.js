import express from "express"
// import { dirname } from "path"
// import { fileURLToPath } from "url"

const app = express();
//const dir = (dirname(fileURLToPath(import.meta.url)));

console.log(new Date("feb 31, 2023 13:13:00").getMonth());
app.get("/", (req,res) => {

    var day = "";
    var advice = "";

    var d = new Date("June 26, 2023 11:13:00").getDay();
      
    if(d == 0 || d == 6) {
        day = "weekend";
        advice = "fun"
    }
    else {
        day = "weekday";
        advice = "work"
    }

    res.render("index.ejs",
    {
        dayType: day,
        advic : advice,
    });    
});


app.listen(3000, (req,res) => {
    console.log("listrnig on 3000");
})
