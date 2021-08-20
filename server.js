const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// setting ejs and ejs layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// importing routes
let indexRouter = require('./routes/index');

// using routes
app.use('/', indexRouter);

// setting and listening to ports
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`port is on ${PORT}`));