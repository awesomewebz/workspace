const express = require("express");
const { APP_PORT } = require("./config");
const db = require("./config/mongoose");
const passport = require("passport");
const passportLocal = require('./config/passport-local-strategy');
const expressLayouts = require('express-ejs-layouts');
const session = require("express-session");
const MongoStore = require('connect-mongo');

const app = express();

const routes = require('./routes');

// parse data
app.use(express.urlencoded());
app.use(express.json());

// use layouts
app.use(expressLayouts);
// extract styles and scripts from sub pages to layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up views
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));

app.use(session({
    name: 'awreports',
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    Cookie: {
       maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongoUrl: "mongodb://localhost/awreports",
        autoRemove: "disabled"
    }, function(err){console.log(err|| "connect-mongo setup ok!");})
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(routes);

app.use((req, res)=>{
    return res.render("404", {
        title: "Page Not Found"
    })
})


app.listen(APP_PORT, ()=> console.log(`Listening on port ${APP_PORT}`));