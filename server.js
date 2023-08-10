const app = require("./src/app")
const http = require('http');


const server = http.createServer(app);
const port = 3456

server.listen(port, ()=>{
    console.log("app is listening on port :",port)
})