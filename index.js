const express = require('express')
const PORT = process.env.PORT || 5000;
const app = express();

app.get("/",(req,res) => {
    res.send("Welcome to backend")
})

app.listen(PORT, function(){
    console.log("http://localhost:" +PORT);
})