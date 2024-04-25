import  express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("hello brother");
})

app.get("/about" ,  (req,res) => {
    res.send("i am just a babyboy007");
})

app.get("/contact" ,  (req, res) => {
    res.send("you can't contact me i am from another universe");
})


app.listen(3000, ()=>{
    console.log("listenig at port 3000")
})