// Express documentation: https://expressjs.com/en/api.html
const BuildingDB = require("./BuildingDB")
const path = require("path");

/* Import the express npm module */
const express = require("express")

/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require("body-parser")

/* Instantiate a server object*/
const app = express()
const port = 5838

/* Tell the server to use EJS by default */
app.set("view engine", "ejs")

/* Parse the request body if there is POST data */
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname))

// Create a new building
app.post("/buildings", async (req, res) => {
    const newBuilding = await BuildingDB.create(req.body);
    res.json(newBuilding);
});

// Update a building
app.post("/buildings/update/:name", async (req, res) => {
    const editedBuilding = await BuildingDB.update(req.body);
    res.json(editedBuilding);
});

// Delete a building
app.post("/buildings/remove/:name", async (req, res) => {
    await BuildingDB.remove(req.params.name);
    res.json();
});

// Get all buildings
app.get("/buildings/all", async (req, res) => {
    const buildings = await BuildingDB.allBuildings();
    res.json(buildings);
});

// Get a building
app.get("/buildings/find/:name", async (req, res) => {
    const building = await BuildingDB.find(req.params.name);
    res.json(building);
});

// Serve page
app.get("/buildings", async (req, res) => {
    res.sendFile(path.join(__dirname, "react_part3.html"));
});

/* Launch the server */
BuildingDB.initialize();
app.listen(port, () => console.log("React application listening on port %d!", port))