require('dotenv').config();
const mongoose = require('mongoose');

const password = process.env.PASSWORD;
const db = process.env.DB;
const user = process.env.USER;
const clusterURL = process.env.URL;

// Localhost URI
// const uri = "mongodb://localhost:27017/zomatoc";

// Remote URI
const uri = "mongodb+srv://" + user + ":" + password + "@" + clusterURL + db + "?retryWrites=true&w=majority";
console.log(uri);
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const dbConnection = mongoose.connection;
module.exports = dbConnection;