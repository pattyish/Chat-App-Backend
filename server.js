require("dotenv").config();
const app = require("./app");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection Error" + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

// Importing All models 
require('./models/User');
require('./models/Chatroom');
require('./models/Message');


app.listen(8000, () => {
  console.log("Server Listening on Port 8000");
});
