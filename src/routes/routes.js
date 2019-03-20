const express = require("express");
const locationRoutes = require("./location");

// Set up API routing here 
const generalRouter = express.Router();
generalRouter.use("/location", locationRoutes);
module.exports = generalRouter;