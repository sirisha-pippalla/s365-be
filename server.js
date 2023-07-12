require("dotenv").config(); //Allow environmental variables to be set on process.env should be at the top
const express = require("express");
const app = express();

//middleware
app.use(express.json());  //parse json bodies in the request object

//redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/", require("./routes/variantRoutes"));
app.use("/", require("./routes/stateRoutes"));


//global error handler. important function params must start with err
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(200).json({
        message : "something went rely wrong"
    });
});

//listen on pc port
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));