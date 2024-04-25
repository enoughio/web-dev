import express, { json } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "annaanna";
const yourPassword = "annaanna";
const yourAPIKey = "49c720db-2934-40a0-915e-a1926a279a65";
const yourBearerToken = "174d7dfe-0029-404e-8e7b-c2672c4cf410";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    let response = await axios.get(API_URL+"random");
    console.log(JSON.stringify(response.data))
    res.render("index.ejs", {content: JSON.stringify(response.data)
    });
  } catch (error) {
    console.error("failed to logerror", error.message);
    res.render('index.ejs', {content: error.message});
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  try {
    let response = await axios.get(API_URL + "all?page=2", {
      auth:{
        username: yourUsername,
        password: yourPassword,
      }
    });
    res.render("index.ejs", {content: JSON.stringify(response.data[1])});
} catch (error) {
  console.error("failed to logerror", error.message);
  res.render("index.ejs", {content: error.message});
}

  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    let response = await axios.get(API_URL + 'filter', {
      params:{
        score: 5,
        apiKey: yourAPIKey,
      }
    });
    res.render("index.ejs", {content: JSON.stringify(response.data[0])});

  } catch (error) {
    res.render("index.ejs", {content: error.message});
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  try {
    let response = await axios.get(API_URL+`secrets/${42}`,{
      headers:{
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    res.render("index.ejs", {content: JSON.stringify(response.data)});

  } catch (error) {
    res.render("index.ejs", {content: error.message});
  }
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
