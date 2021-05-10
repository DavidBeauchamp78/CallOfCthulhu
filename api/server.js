const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/users");
var cors = require('cors')
const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
//enable cors
app.use(cors({
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}));
// DB Config
//allows use of values stored in the default.json.
const config = require('config');
//gets the URL value stored in default.json.
const db = config.get('mongoURI');
// Connect to MongoDB
mongoose
  .connect(
    db,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));