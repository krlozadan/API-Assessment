const express = require("express");

const locationRouter = express.Router();

locationRouter.get("/", (req, res) => {
    res.status(200).json({message : "GET Location Route"});
});

module.exports = locationRouter;