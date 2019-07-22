var express = require('express');
var app     = express();
var exphbs = require('express-handlebars');
var path = require('path');


app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');


//secret key
app.set('secretKey', 'laitech/node_9801');

require('./middlewares')(app);
require('./config')(app);

require('./routes')(app);
require('./services/errorHandler')(app);


module.exports = app;
