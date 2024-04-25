import express from "express";
import bodyParser from "body-parser";
import { pg } from "pg";
const app = express();
const port = 3000;

var db = pg.clint();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

async function loaditems() {
  try {
    let response = await db.query("select * from items");
   items = response.rows;
   return items;

  } catch (error) {
    console.log(error);
  }
}

app.get("/", async (req, res) => {
  await loaditems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });

});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;

  db.query("insert into items (title) value($1);",[req.title])

  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {
  deleteItemId

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
