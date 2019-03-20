const config = require("./config");
// Web framework package
const express = require("express");
//  Parse the incoming req body for easier manipulation
const bodyParser = require("body-parser");
// API enpoints
const routes = require("./routes/routes");

// Instantiate the api instance and setup middleware and routes
const api = express();
api.use(bodyParser.json({ limit : config.bodyLimit }));
api.use("/api", routes);

// Start API
api.listen(config.port);
console.log(`API running on port: ${config.port}`);