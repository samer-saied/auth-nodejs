const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const strings = require("./core/strings");
const authRouter = require("./routes/auth");
const imageRouter = require("./routes/upload-image");
const path = require('path')
const morgan = require('morgan');
const productRouter = require("./routes/products");


const PORT = process.env.PORT || 3000;

// Express App - JSON
const app = express();
app.use(express.json());

// Logger NodeJS
app.use(morgan('combined'))

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('uploads'));

// view engine ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve "static" 
app.use(express.static(path.join(__dirname, '/uploads')))


// const logErrors = (err, req, res, next) =>{
//   console.error('\x1b[31m', err) // adding some color to our logs
//   const status = err.status || 400
//   res.status(status).send(err.message)
// }
app.use(productRouter);
app.use(authRouter);
app.use(imageRouter);


// app.use(logErrors)


// Database uri 
const DB =
 "mongodb+srv://samersaied:"+strings.passwordDB+"@cluster0.uxsp7w2.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });


// Server Liston
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT ${PORT}`);
});
