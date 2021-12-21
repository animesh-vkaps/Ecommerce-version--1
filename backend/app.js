const express = require('express');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error');
const app = express();
const path = require("path")
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors());
const product = require('./routes/productRoutes');
const user = require('./routes/userRoute');
const category = require('./routes/categoryRoute');
const admin = require("./routes/adminRoute");
const order = require("./routes/orderRoute");

let static = path.join(__dirname, '/images')
 
console.log(static)

app.use('/images', express.static(path.join(__dirname, '../images')))
// app.use('/images', express.static(__dirname + ''));

app.use("/api/v1",product);
app.use(require("./routes/userRoute"))
app.use("/api/v1",category);
app.use("/api/v1",order);
app.use("/api/v1",user)
//app.use("api/v1",admin);
//Middleware for errors
app.use(errorMiddleware);



module.exports = app;