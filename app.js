const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { rawListeners } = require("process");

const app = express();


// Express body-parser is an npm module used to process data sent in an HTTP request body. 
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

    const url = "https://us21.api.mailchimp.com/3.0/lists/Your AudienceID";   // you have to replace  X to us after the word of us ("us21") available in api key , Mailchimp has several servers that they're running simultaneously beacuse they're big operations
    
    const options = {
        method: "POST",
        auth:"rahul1:Your API ID"    //do not use spacebar

    }

    const request = https.request(url, options, function(response){

       if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
       }else{
        res.sendFile(__dirname + "/failure.html")
       }
    
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/")
})




app.listen(3000, function(){
    console.log("server is running on port 3000");
});


