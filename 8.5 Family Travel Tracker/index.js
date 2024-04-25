import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "aniketaajj",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];



async function checkVisisted(par) {
  const result = await db.query("sELECT country_code FROM visited_countries where user_id = $1;",[par]);
  let countries = [];

  result.rows.forEach((country) => {
  countries.push(country.country_code);
  });
  return countries;
}


async function loaduser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}


app.get("/", async (req, res) => {
  var currentUser = await loaduser();
  const countries = await checkVisisted(currentUserId);
  console.log(currentUser);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users:  users,
    color:  currentUser,
    });
});



app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const currentUserId = req.body.user;

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});


app.post("/user", async (req, res) => {
  var pressrd = req.body.add || req.body.user;

  users = loaduser();
  if(pressrd == 'add'){
    res.render("new.ejs");
  }else{
     currentUserId = req.body.user;
     res.redirect("/");
  }
});


app.post("/new", async (req, res) => {

  try {
    let response = await db.query("insert into users (name, color) values($1, $2) RETURNING *",
     [req.body.name, req.body.color]);

     console.log(response.rows)

  } catch (error) {
    console.log(error);
  }

  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
