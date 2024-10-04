//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


import express from "express";
import { dirname }  from "path";
import { fileURLToPath }  from "url";
import bodyParser from "body-parser";
import { connected } from "process";

const app = express()
const __dir = dirname(fileURLToPath(import.meta.url));
let isAuth = false;

function checkuser(req,res, next) {

    if(req.body.password == "ilove")
      {  isAuth = true;
      } 
      else
        res.send("goo")

    console.log("in middleware")
    next()
}

app.use(bodyParser.urlencoded({extended: true}))
app.use(checkuser);



app.get("/", (req, res) => {
  res.sendFile( __dir+"/public/index.html")
});


app.post("/check", (req,res) =>{
    console.log(req.body.password+"in check")

    if(isAuth == true)
        res.sendFile(__dir+"secret.html")
    else
        res.redirect("/");
})


app.listen(3000, (req, res) =>{
    console.log("on the go ")
   // console.log(__dir+"/public/index.html")
})



