const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      
      useUnifiedTopology: true,
      
    })
    .then(() => {
      console.log("Database connected successfully!!!");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectDatabase;
//useCreateIndex: false,//useFindAndModify: false,