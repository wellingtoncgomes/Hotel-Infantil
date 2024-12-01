const https = require('https');
const fs = require('fs');
const express = require('express');

const port = process.env.PORT ||443;

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.set('views','./app/views');


const sslOptions = {
    key: fs.readFileSync('C:/Users/Wellington/OneDrive/Área de Trabalho/Atividade IFSP/4ºSemestre/web/HotelInfantil/config/key.pem'),
    cert: fs.readFileSync('C:/Users/Wellington/OneDrive/Área de Trabalho/Atividade IFSP/4ºSemestre/web/HotelInfantil/config/cert.pem'),
};

https.createServer(sslOptions, app).listen(port, '0.0.0.0', () => {
    console.log(`Servidor HTTPS rodando na porta ${port}`);
});

module.exports=app;