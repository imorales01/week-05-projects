//importing some packages
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const models = require('./models');

const PORT = process.env.PORT || 8000;

// initiate application server
const app = express();


// Setup the body-parser and handlebars middleware packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);


// The controllers contain all routing-
app.use(require('./controllers'));


// syncs the inforation to the database rows- we use sequelize to create 
// the rows and columns
// aslong as you explain it
// server shouldnt start if the database doesnt exist
models.sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
    });
  })


