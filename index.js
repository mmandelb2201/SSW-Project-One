/*
---------HOW TO TEST WEBSITE------------
1) run "npm run dev in terminal"
2) start debugging in IDE or
open chrome and go to localhost:8080
---------HOW TO STOP TESTING SERVER-------
1) in  terminal type control c
2) type Y and press enter
*/
//index.js handles set up of the site and adding node.js modules
//add the node.js modules to the site
const express = require("express")
const path = require("path")
const app = express()
const handlebars = require("express-handlebars")
var favicon = require('serve-favicon');

//set handlebars as view engine
app.engine("handlebars", handlebars(({
    //set main as the header and footer for the site
    defaultLayout: "main",
    //set view/layouts as our static page files
    layoutsDir: path.join(__dirname, "views/layouts")
})))
//set website favicon
app.use(favicon(__dirname + '/public/images/studyBuddyFaviconSmall.png'));
app.set("view engine", "handlebars")
    //set /scripts as our folder for javascript files
app.use("/scripts", express.static(path.join(__dirname, "scripts")))
    //Serves static files (we need it to import a css file)
app.use(express.static("public"))
    //create a route for each page, might change to a separate js file later
    //app.get is a request for the page ending in "/" or "", 
    //res is the response, we use res.render to respond with a static page file
    //with variables
app.get("/", (req, res) => {
    res.render("index.handlebars", {
        title: "Study Buddy"
    })
})
app.get("/about", (req, res) => {
    res.render("about.handlebars", {
        title: "About Page"
    })
})

app.get("/user/new", (req, res) => {
    res.render("newuser.handlebars", {
        title: "Create Account"
    })
})
app.get("/question/show/:id", (req, res) => {
    res.render("question.handlebars", {
        title: "Question",
        question: req.params.id
    })
})
app.get("/question/new", (req, res) => {
    res.render("newquestion.handlebars", {
        title: "New Question"
    })
})
app.get("/account/sign-in", (req, res) => {
    res.render("signin.handlebars", {
        title: "Sign In"
    })
})
app.get("/flashcards", (req, res) => {
    res.render("flashcards.handlebars", {
        title: "Flashcard Generator"
    })
})

app.get("/messenger", (req, res) => {
    res.render("messenger.handlebars", {
        title: "Messenger"
    })
})

app.get("/account/show/:id", (req, res) => {
        res.render("account.handlebars", {
            title: "Account",
            userID: req.params.id
        })
})
app.get("/search/questions/:subject/:sort", (req, res) => {
    res.render("searchquestions.handlebars", {
        title: "Question Search",
        subject: req.params.subject,
        sort: req.params.sort
    })
})
app.get("/inter-ships", (req, res) => {
    res.send("i would also like an internship")
})
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.render("pagenotfound.handlebars", {
        title: "Page Not Found"
    })
  });
//set the port to run the website on
const PORT = process.env.PORT || 8080
    //run the website on PORT
app.listen(PORT, () => console.log("server started on port " + PORT))

/**/