import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "aniket",
  port: 5432,
})

// Connect to PostgreSQL
db.connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  let data = [] 
  let countries = []
   const response =  await db.query("select country_code from visited_countries")
   response.rows.forEach( item => { 
     countries.push(item.country_code);
    });
  res.render("index.ejs", { countries, total: countries.length })
});

app.get("/data", async(req,res)=>{
  try {
    const id = req.query.id;
    console.log(id)
    const data = await db.query("select country_name, country_code from countries where id = $1",[id]);
    console.log(data);

  } catch (error) {
    console.error("Error processing request:");
    res.status(500).send("Error adding country");
  }
})


// Route to add a new country to visited_countries
app.post("/add", async (req, res) => {
  try {
    // console.log(req.body.country);
    const input = req.body.country;
    //cecking for duplicates
    const isavail = await db.query("select id from visited_countries where Lower(country_name) like Lower($1)", [input])
    if(isavail.rows.length == 0){

      
      // Query to find the country code and name
      const codeResult = await db.query(
      "SELECT country_code, country_name FROM countries WHERE LOWER(country_name) LIKE LOWER($1 || '%')",
      [input]
    );
    
    // If the country is found, insert it into the visited_countries table
    if (codeResult.rows.length > 0) {
      const { country_code, country_name } = codeResult.rows[0];
      await db.query(
        "INSERT INTO visited_countries (country_code, country_name) VALUES ($1, $2)",
        [country_code, country_name]
      );
      console.log(`Country added: ${country_name} (${country_code})`);
    } else {
      console.log("Country not found");
      
      let data = [] 
      let countries = []
      const response =  await db.query("select country_code from visited_countries")
      
      response.rows.forEach( item => { 
        countries.push(item.country_code);
      });
      res.render("index.ejs", {error: "country not found", countries, total: countries.length })
      
    }
  }
    // Redirect back to the homepage after adding
    res.redirect("/");
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).send("Error adding country");
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
