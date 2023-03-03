const express = require('express');
const bodyParser = require('body-parser');
const ErrorHandler = require('./middleware/ErrorHandler');
const dotEnv = require('dotenv').config();
const app = express();
const cors = require('cors')
const Port = process.env.PORT || 3000;

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials:true
  }

app.use(cors(corsOptions));

// parse the request body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// /users is common route
app.use('/users' , require('./Routes/UsersRoutes'));

// @Route (/admin) is common route
app.use('/admin' , require("./Routes/AdminRoutes"));


app.use(ErrorHandler);


app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})