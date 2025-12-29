require('dotenv').config({ path: require('path').resolve(__dirname, './.env') });
const http = require("http")
const app = require("./src/config/express.config")
const server= http.createServer(app)

const port =process.env.PORT || 9005
server.listen( port ,process.env.LISTENON, (error)=>{
if(error){
    console.log("server error")
}
else{
    console.log("server is running on port :9005")
    console.log("Press ctrl +c  to discontinue server")
}

}) 
    