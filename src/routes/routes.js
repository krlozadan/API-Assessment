const express = require("express");
const locationRoutes = require("./location");
const usersRoutes = require("./users");

// Set up API routing here 
const generalRouter = express.Router();

generalRouter.use("/location", locationRoutes);
generalRouter.use("/users", usersRoutes);


module.exports = generalRouter;