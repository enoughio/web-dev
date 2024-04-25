import { express, query } from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();

pg.clint({
    username: "postgrace",
    password: "poiuytrewq",
    port: "5432",
    host: "localhost"
});

query = res.rel;

pg.close;



app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=> {
    res.render("index.ejs", );
});

app.post("/sumbit", (req,res)=>{
    var ans = req.body.submit;

    query.forEach(contry => {
        if(ans == query.contry.capital);
    });

    

});



app.listen(3000, (req,res)=>{
    console.log("listening at port 3000");
})