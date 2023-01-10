const dotenv = require('dotenv');
dotenv.config();


module.exports =  {
    APP_PORT,
    MONGO_CONNECTION_URL
} = process.env;