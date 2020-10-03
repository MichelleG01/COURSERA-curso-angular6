var express = require("express");
//Inicializando un servidor web
var app = express();
//Le indicamos que vamos a utilizar json
app.use(express.json());
//Cuando empiece a escuchar en el puerto 3000 para que pueda ser utilizado, 
//va a llamar a este "call back", esta función y nos va a loguear esto en la consola.
app.listen(3000, () => console.log("Server running on port 3000"));

app.get("/url", (req, res, next) => res.json([ "Paris", "Barcelona", "Barranquilla", "Montevideo", "Santiago de Chile", "Mexico DF", "Nueva York" ]));

var misDestinos = [];
app.get("/my", (req, res, next) => res.json(misDestinos));
app.post("/my", (req, res, next) => {
  console.log(req.body);
  misDestinos = req.body;
  res.json(misDestinos);
});