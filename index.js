const express = require("express");
const appFile = require("./app/app");
const cors = require("cors");
const categoryDB = require("./dbFiles/categoriesFileDB");
const placesDB = require('./dbFiles/placesFileDB');
const itemsDB = require('./dbFiles/itemsFileDB');
const app = express();
const port = 8000;

categoryDB.init();
placesDB.init();
itemsDB.init();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/", appFile);



app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

