//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


import express from "express";
import { dirname }  from "path";
import { fileURLToPath }  from "url";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));

const password = "iloveprograming";

function check(n)
{
  if( n == password )
  {
    res.sendFile(__dirname+"/public/secret.html");
  }
  else
  {
     res.redirect("/");
  }
}

app.get(
  "/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
  }
)

app.post( "/check", (req,res)=>{
     const result = req.body.password;
     check(result);
}
)
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
