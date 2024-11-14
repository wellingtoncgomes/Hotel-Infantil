const dbConnection = require('../../config/dbConnection');
const {getPaintings} = require('../models/modelHome');
const {addComment, getComments} = require('../models/modelComments');

module.exports.home = (app, req, res) => {
    console.log('[Controller Home]');
    const dbConn = dbConnection();
    getPaintings(dbConn, (error, paintings) => {
      // console.log("Obras", paintings);
      getComments(dbConn, (error, comments) => {
        // console.log('Comentários', comments);
        const paintingsWithComments = paintings.map(painting => {
          // Filtra os comentários correspondentes ao painting atual
          const paintingComments = comments.filter(comment => comment.idobra === painting.id);
          // Retorna o painting com os comentários associados
          return {
            ...painting,
            comments: paintingComments
          };
        });
        //console.log(JSON.stringify(paintingsWithComments, null, 2));
        // console.log(JSON.stringify(paintingsWithComments, null, 2));
  
        res.render('home.ejs', { paintings: paintingsWithComments });
      });
    })
  }
module.exports.addComment = (app, req, res) => {
    console.log('[Controller Home] Save Comment');
    const idObra = req.query.idobra;
    const comment = req.body.comment;
    console.log('idObra', idObra);
    console.log('Comment', comment);
    dbConn = dbConnection();
    addComment(dbConn, idObra, comment, (error, result) => {
      console.log('Error', error);
      console.log('Resultado', result);
      res.redirect('/');
    });
  };