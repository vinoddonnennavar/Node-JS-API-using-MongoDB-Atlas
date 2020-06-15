const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
dotenv.config();

//connect DB
// Local Mongo_DB connection  
//MONGO_URI= mongodb://localhost/cluster0

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true }).then(() => console.log('DB connected'));


mongoose.connection.on("error",err => {
    console.log(`DB Connection error : ${err.message}`);
})


//routes
const postRoutes = require('./routes/post');
// const myOwnMiddleware = (req, res, next) => {
//     console.log('My Middleware API');
//     next();
// }

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
//app.use(myOwnMiddleware);

app.use('/', postRoutes);
const port = process.env.PORT || 5000;  
app.listen(5000, () => {
    console.log(`A Node JS API is running on port : ${port}`);
});