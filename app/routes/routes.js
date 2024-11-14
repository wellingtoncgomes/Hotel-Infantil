const {home,addComment}= require('../controllers/controllerHome');

module.exports ={

   home:(app) =>{
     app.get('/', function(req,res){
        home(app,req,res);
    });
}
}
