const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const port = process.env.PORT ||443;

const app = express();
const bcrypt = require('bcrypt');
app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.set('views','./app/views');

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem')),
};

https.createServer(sslOptions, app).listen(port, '0.0.0.0', () => {
    console.log(`Servidor HTTPS rodando na porta ${port}`);
});

module.exports=app;