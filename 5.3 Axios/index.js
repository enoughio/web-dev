import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async(req,res)=>{
  try {
    let response = await axios.get('https://bored-api.appbrewery.com/random')
    let data = response.data;
    res.render("index.js", {data: data})
  } catch (error) {
    res.render("index.ejs", )
  }
});

app.listen(3000, (req,res)=>{
  console.log("at 3000000000");
});