const express = require("express");
const PromiseWrapper = require("../models/promiseWrapper");
const User = require("../models/user");
const isObjectEmpty = require("../utils/isObjectEmpty");
const generateValidationErrorMessage = require("../utils/generateValidationErrorMessage");

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
            return res.status(400).json({ error : generateValidationErrorMessage(errorCreatingUser.errors) });
        }
        return res.status(500).json({ error : "Something went wrong, please try again later" });
    }
    res.status(200).json(newUser);
});

// PUT
// api/users/<user_id>
// Update a user information
usersRouter.put("/:userId", async (req, res) => {
    
    // Configure the update object
    const updateObject = {};
    if (req.body.hasOwnProperty("first_name")) {
        updateObject["first_name"] = req.body.first_name;
    }
    if (req.body.hasOwnProperty("last_name")) {
        updateObject["last_name"] = req.body.last_name;
    }
    if (req.body.hasOwnProperty("ip_address")) {
        updateObject["ip_address"] = req.body.ip_address;
    }
    if (isObjectEmpty(updateObject)) {
        return res.status(400).json({ error : "Please provide the information to be updated" });
    }
    
    // Get the specified user from the database 
    const wrapper = new PromiseWrapper();
    const { data : userToUpdate, error : errorFetchingUser } = await wrapper.async(User.findById(req.params.userId));
    if (errorFetchingUser != null) {
        if (errorFetchingUser.hasOwnProperty("name") && errorFetchingUser.name == "CastError") {
            return res.status(400).json({ error : "Please provide a valid user id" });
        }
        return res.status(500).json({ error : "Something went wrong, please try again later" });
    } else if (errorFetchingUser == null && userToUpdate == null) {
        return res.status(404).json({ error : "No user found for teh given id" });
    }

    // Update the user information
    const { error : errorUpdatingUser }  = await wrapper.async(userToUpdate.update(updateObject, { runValidators : true }));
    if (errorUpdatingUser != null) {
        if (errorUpdatingUser.hasOwnProperty("errors")) {
            return res.status(400).json({ error : generateValidationErrorMessage(errorUpdatingUser.errors) });
        }
        return res.status(500).json({ error : "Something went wrong, please try again later" });
    }
    res.status(200).json({ status : "updated" });
});

module.exports = usersRouter;