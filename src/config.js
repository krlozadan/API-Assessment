// We're using environment variables to store sensitive information
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port : process.env.PORT, 
    databaseURL : process.env.DB_URL,
    bodyLimit : process.env.BODY_LIMIT,
    databaseName : process.env.DB_NAME,
    ipstackAPIKey : process.env.IPSTACK_API_KEY
}