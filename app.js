const express = require("express");
const app = express();
const port = "8000";
app.use(express.static(__dirname+"/public"))


app.listen(port, ()=>{
    console.log(`server is running on localhost:${port}`);
});