// Simple mongodb validation error message combine
module.exports = (mongoDBErrorObject) => {
    let errorMessage = "Please provide a valid";
    for (let errorKey in mongoDBErrorObject) {
        errorMessage += ` ** ${errorKey} ** `;
    }
    return errorMessage;
};