import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var db = new pg.Client({
  user: "postgres",
  host: "localhost",
  port: 5432,
  password: "aniketaajj",
  database: "world"
});

db.connect();

async function fetchdata() {
  
  var countries = [];
  let response =  await db.query("SELECT country_code FROM visited_countries");
  // console.log( typeof(response));
  
  (response.rows).forEach(country => {
    countries.push(country.country_code);    
    });

    console.log(countries);
    return countries;
}


app.get("/", async (req, res) => {
  //Write your code here..
  
  let country = await fetchdata();

    res.render("index.ejs", {
      countries: country,
      total: country.length,
    });
   // console.log(countries);
});


app.post("/add", async(req,res)=>{
  var country = (req.body.country).toLowerCase();
  var code = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) = $1", [country]);
  
  if(code.rows.length != 0)
  {
    let response =  await db.query("SELECT country_code FROM visited_countries WHERE country_code = $1",[code.rows[0].country_code]);
    console.log("fond in viisite")
    console.log(response.rows[0].country_code);
    
    if(response.rows.length == 0)
    {
      await db.query("INSERT INTO visited_countries(country_code) VALUES($1)",[code.rows[0].country_code])
      res.redirect("/");
    }

  }else{
    res.render("index.ejs", {
      error: "country not found",
      total: country.length,
    });
  }

   //console.log(code.rows[0].country_code);
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
