
import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let totalCorrect = 0;

const db = new pg.Client({
  user : 'postgres',
  host : 'localhost',
  database: "world",
  password : 'aniket',
  port : 5432
})

db.connect();  // to connect to database

let quiz  =  []

db.query("select * from quiz", (err, res)=>{
  if(err){
    console.error("error in execution of bd commannd", err.message)
  } else {
    quiz = res.rows;
    // console.log(res.rows)
  }

  db.end();  //end connection

})


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.send(200);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
