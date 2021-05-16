require("dotenv").config({ path: __dirname + "/config/.env" });
const express = require("express");
const app = express();


require("./startup/prod")(app);
require("./startup/logging")();
require("./startup/sessions")(app);
require("./startup/database")();
require("./startup/routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
