import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

//Step 3 - Make the styling show up.
//Hint 1: CSS files are static files!
//Hint 2: The header and footer are partials.
//Hint 3: Add the CSS link in header.ejs

//Step 4 - Add a dynamic year to the footer.
//Hint: Google to find out how to get the current year using JS.

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {

    [
        {
        "name": "iss",
        "id": 25544
        }
    ]
    
});


app.post("/submit", (req, res) => {
  
  res.render("index.ejs",{
    adjective : adj[a],
    noun : noun[n],
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
