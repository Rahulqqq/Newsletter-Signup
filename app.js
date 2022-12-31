const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){

    const firstName= req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName
                    
                }
            }
        ]
    };
    let jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/cb9e9e46fc";   // you have to replace  X to us after the word of us ("us21") available in api key , Mailchimp has several servers that they're running simultaneously beacuse they're big operations
    
    const options = {
        Method: "POST",
        auth:"rahulqqq"

    }

    https.request(url, options, function(response){

    })
});







app.listen(3000, function(){
    console.log("server is running on port 3000");
});


// API KEY:
// eed09f62faad37bc3662012abb0e66b3-us21

// Audience Id
// cb9e9e46fc