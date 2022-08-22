const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 3000;
const app = express();
const passwordDB= "ktMQQPuc5I8xEkQb"

app.use(express.json());
app.use(authRouter);

const DB =
 "mongodb+srv://samersaied:"+passwordDB+"@cluster0.uxsp7w2.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
