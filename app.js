require("dotenv").config();

const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const userRouter = require("./api/users/user.router");
const adminRouter = require("./api/admin/admin.router");


const app = express();

// Enable CORS for all origins
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);


// Define your route
app.get('/', (req, res) => {
  res.json({code:'200'});
});


app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on PORT :", process.env.APP_PORT);
});

// app.listen();