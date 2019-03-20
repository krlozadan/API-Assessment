const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const PromiseWrapper = require("./models/promiseWrapper");
const routes = require("./routes/routes");

// Self invoking function to connect to the DB. Kills the node instance if it can't connect
(async () => {
    const wrapper = new PromiseWrapper();
    const { error : errorConnectingToDB } = await wrapper.async(mongoose.connect(config.databaseURL, { dbName : config.databaseName, useNewUrlParser : true }));
    if (errorConnectingToDB != null) {
        console.log("Couldn't connect to Database");
        process.exit();
    }
    console.log("Successfully connected to Database");
})();

// Web framework package
// Instantiate the api instance and setup middleware and routes
const api = express();
//  Parse the incoming req body for easier manipulation
api.use(bodyParser.json({ limit : config.bodyLimit }));
// API enpoints
api.use("/api", routes);

// Start API
api.listen(config.port);
console.log(`API running on port: ${config.port}`);