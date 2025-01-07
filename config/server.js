const https = require("https");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session"); // Importação necessária
const helmet = require("helmet");

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 443;
const app = express();

// Configurações do EJS e arquivos estáticos
app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static("./public"));

// Parse de dados do formulário e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware de segurança
/*
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Permite inline scripts (não recomendado em produção)
        styleSrc: ["'self'", "'unsafe-inline'"], // Permite inline styles (também não recomendado em produção)
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );*/
// Configuração de sessões
app.use(
  session({
    secret: process.env.SESSION_SECRET || "HotelInfantil",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Cookies seguros
      httpOnly: false, // Previne acesso via JavaScript no cliente
      sameSite: "strict", // Restringe envio de cookies a pedidos do mesmo domínio
    },
  })
);

// Validação dos certificados
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "certs/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "certs/cert.pem")),
};

if (!sslOptions.key || !sslOptions.cert) {
  console.error(
    'Certificados SSL não encontrados. Verifique "key.pem" e "cert.pem".'
  );
  process.exit(1);
}

// Inicialização do servidor
https.createServer(sslOptions, app).listen(port, "0.0.0.0", () => {
  const env = process.env.NODE_ENV || "development";
  console.log(`[${env}] Servidor HTTPS rodando na porta ${port}`);
});

module.exports = app;
