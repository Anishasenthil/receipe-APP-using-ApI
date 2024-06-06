
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
          res.render("index.ejs",{data : "food receipe"});
        } catch (error) {
          console.error("Failed to make request:", error.message);
          res.render("index.ejs", {
            error: error.message,
          });
        }
  });

  app.post("/", async (req, res) => {

    try{
        console.log(req.body);
        const food=req.body.foodname;
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
        const result = response.data;
       
        console.log(result.meals[0]);
        res.render("index.ejs",{data : result.meals[0]});
      }
      catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error:"NO activity match your criteria ",
        });
      }
    });


  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });