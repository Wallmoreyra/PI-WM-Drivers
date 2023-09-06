const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");


const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

// ante cualquier duda esto esta colocado de mas por posible error en los headers
// server.use((req, res, next) =>{
//     res.header("Access-Control-Allow-Origin", "*"); //update to match the omain you will maje the request from
//     res.header("Access-Control-Allow-Credentials","true");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTRIONS, PUT, DELETE");
//     next();
// });

server.use(router);


module.exports = server;
