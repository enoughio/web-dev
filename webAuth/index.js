import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(bodyParser)
app.use(express.json());
app.use(express.static('public'))

const Userdata = {}

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const id = `${Date.now()}`;

    const user = {
        id, 
        username,
        password,
    }

    Userdata[id] = user;
    console.log("regester succesfully", Userdata[id]);
    
    res.json({id});
})



app.listen(PORT, ()=> console.log(`running on Port ${PORT}`));