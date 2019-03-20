const express = require("express");
const PromiseWrapper = require("../models/promiseWrapper");
const User = require("../models/user");

const usersRouter = express.Router();

// POST
// api/users/
// Create a new user in the database
usersRouter.post("/", async (req, res) => {
    // Get new user information from the request body
    const newUserOpts = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        ip_address : req.body.ip_address
    };
    // Save the new user to the DB
    const wrapper = new PromiseWrapper();
    const { data : newUser, error : errorCreatingUser } = await wrapper.async(new User(newUserOpts).save()); 
    // This is only a simple error checking if we wanted to give more detail we should check the error message in its entirety
    if (errorCreatingUser != null) {
        if (errorCreatingUser.hasOwnProperty("errors")) {
            let errorMessage = "Please provide a valid";
            for (let errorKey in errorCreatingUser.errors) {
                errorMessage += ` ** ${errorKey} ** `;
            }
            return res.status(400).json({ error : errorMessage });
        }
        return res.status(500).json({ error : "Something went wrong, please try again later" });
    }
    res.status(200).json(newUser);
});

module.exports = usersRouter;