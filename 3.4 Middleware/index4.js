import express from "express";
import { dirname }  from "path";
import { fileURLToPath }  from "url";

const app = express();
const port = 3000;

const password = "iloveprograming";

function check(n)
{
  if( n == password )
  {
    res.sendFile(__dirname+"./public/")
  }
}

app.get(
  "/", (req, res) => {
    res.sendFile(__dirname+"./public/index.html");
  }
)

app.post( "/", (req,res)=>{

}
)
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
