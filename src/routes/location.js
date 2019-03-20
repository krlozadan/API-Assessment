const express = require("express");
const PromiseWrapper = require("../models/promiseWrapper");
const iplocation = require("iplocation").default;

const locationRouter = express.Router();

// GET
// api/location/
// Retrieve end user's remote IP address and detect user's location using 3rd party API
locationRouter.get("/", async (req, res) => {
    const wrapper = new PromiseWrapper();
    const { data : location , error : errorGettingLocation } = await wrapper.async(iplocation(req.ip));
    if (errorGettingLocation != null) {
        res.status(500).json({ error : "Something went wrong, please try again later" });
    } else {
        res.status(200).json({ location });
    }
});

module.exports = locationRouter;