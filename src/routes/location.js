const config = require("../config");
const express = require("express");
const PromiseWrapper = require("../models/promiseWrapper");
const request = require("request-promise");
const locationRouter = express.Router();

// GET
// api/location/
// Retrieve end user's remote IP address and detect user's location using 3rd party API
locationRouter.get("/", async (req, res) => {
    const wrapper = new PromiseWrapper();
    
    const reqOpts = {
        method: "GET",
        uri: `${config.ipstackURL}${req.ip}?access_key=${config.ipstackAPIKey}`,
        json: true // This is to parse the response body
    };

    const { data : location , error : errorGettingLocation } = await wrapper.async(request(reqOpts));
    if (errorGettingLocation != null) {
        res.status(500).json({ error : "Something went wrong, please try again later" });
    } else {
        res.status(200).json({ location });
    }
});

module.exports = locationRouter;