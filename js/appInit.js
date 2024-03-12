var express = require('express'),
app = new express(),
setting = require('./appSetting'),
con = require('./connection'),
rptRouter = require('./../routers/rptRouter'),
sessions = require('express-session'),
bodyParser = require('body-parser');
app.set('views', './views');
app.set('view engine','ejs')
app.use(express.static(__dirname + '/..'));
app.use(bodyParser.json({'limit':'10mb',extended:true}))
app.use(bodyParser.urlencoded({'limit':'10mb',extended:true}))
app.use(sessions({
    secret:'haha',
    saveUninitialized:true,
    cookie:{maxAge:1000*24*60*60},
    resave:false
}))
console.log("DIRNAME",__dirname)
module.exports = {
    app:app,
    setting:setting,
    con:con,
    rptRouter:rptRouter
}