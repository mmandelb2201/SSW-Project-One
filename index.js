/*
---------HOW TO TEST WEBSITE------------
1) run 'npm run dev in terminal'
2) start debugging in IDE or
open chrome and go to localhost:5000
---------HOW TO STOP TESTING SERVER-------
1) in  terminal type control c
2) type Y and press enter
*/
//index.js handles set up of the site and adding node.js modules
//add the node.js modules to the site
const express = require('express');
const path = require('path');
const app = express();
const handlebars = require('express-handlebars');
var firebase = require("firebase/app");
require("firebase/auth");
//configure and start firebase 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAthaQNOszYAVRED_eFhAFH7j2V_hZDwr8",
    authDomain: "ssw-project-one.firebaseapp.com",
    projectId: "ssw-project-one",
    storageBucket: "ssw-project-one.appspot.com",
    messagingSenderId: "199485616924",
    appId: "1:199485616924:web:05a7279da5c9c36f9040d9",
    measurementId: "G-L5WC5C8CC4"
    };
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};

//set handelbars as view engine
app.engine('handlebars', handlebars(({
    //set main as the header and footer for the site
    defaultLayout: 'main',
    //set view/layouts as our static page files
    layoutsDir: path.join(__dirname, 'views/layouts')
  })));
app.set('view engine', 'handlebars');
//set /scripts as our folder for javascript files
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
//create a route for each page, might change to a seperate js file later
//app.get is a request for the page ending in "/" or "", 
//res is the respone, we use res.render to respond with a static page file
//with variables
app.get('/', (req, res) => {
    res.render('index.handlebars', {
        title: 'Home Page'
    });
});
app.get('/about', (req, res) => {
    res.render('about.handlebars', {
        title: 'About Page'
    });
});
app.get('/user/new', (req, res) => {
    res.render('newuser.handlebars', {
        title: 'Create Account'
    })
});
app.get('/user/create', (req, res) => {
    res.send('creating new account...');
});

//set the port to run the website on
const PORT = process.env.PORT || 5000;
//run the website on PORT
app.listen(PORT, () => console.log('server started on port ' + PORT));
