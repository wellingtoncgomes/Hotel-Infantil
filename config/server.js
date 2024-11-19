const express = require('express');
const port = process.env.PORT ||3000;

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.set('views','./app/views');

app.listen(port,function(){
    console.log('Servidor rodando na porta',port);
});

module.exports=app;