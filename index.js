const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const strings = require("./core/strings");
const authRouter = require("./routes/auth");
const imageRouter = require("./routes/upload-image");
const path = require('path')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('uploads'));
app.set('view engine', 'ejs');

// Serve "static" 
app.use(express.static(path.join(__dirname, '/uploads')))


app.use(authRouter);
app.use(imageRouter);

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT ${PORT}`);
});
