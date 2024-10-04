import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.post("/submit", (req, res) =>{
  var fname = req.body.fName;
  var lName = req.body.lName;

  let name = fname+lName;
   res.render('index.ejs', {
    len : name.length,
   })

})






app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
