const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')
//config

dotenv.config({path:"backend/config/config.env"})
connectDatabase();
const server = app.listen(9000,()=>{
    console.log(`Server is started at http:localhost:9000`);
}) 

//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Server is shutting down due to unhandled promise rejection.")

    server.close(()=>{
        process.exit(1)
    })

})