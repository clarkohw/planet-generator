const session = require('express-session');
const express = require('express');
const app = express();
const PORT = 3000;
var routes = require('./routes/routes');
const bodyParser = require('body-parser');
const mysql = require('mysql')

// set up body parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//use handlebars for templating
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
//give access to public stuff like css, images
app.use(express.static(__dirname + '/public'));

app.use(routes);

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})