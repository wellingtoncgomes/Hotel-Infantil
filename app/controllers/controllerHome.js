const dbConnection = require('../../config/dbConnection');
const {getPaintings} = require('../models/modelHome');


module.exports = {
    home: (req, res) => {
      res.render('home.ejs');
    }
  };
