const express =require("express");
const cors = require("cors");
const {controllerDebug} = require("../controller/controllerDebug");
const {controllerUpdateContentPage} = require("../controller/controllerUpdateContentPage");
const {controllerGetContent} = require("../controller/controllerGetContent");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    {origin: '*'}
));


app.get("/api/debug", controllerDebug);
app.get("/api/get/content", controllerGetContent);
app.post("/api/content/update",controllerUpdateContentPage);

export {app}