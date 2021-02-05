require("dotenv").config({ path: __dirname + "/config/.env" });
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/sessions")(app);
require("./startup/database")();
require("./startup/routes")(app);
require("./startup/prod")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
