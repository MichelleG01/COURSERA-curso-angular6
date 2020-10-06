var express = require("express"), cors = require('cors');
//Inicializando un servidor web
var app = express();
//Le indicamos que vamos a utilizar json
app.use(express.json());
app.use(cors());
//Cuando empiece a escuchar en el puerto 3000 para que pueda ser utilizado, 
//va a llamar a este "call back", esta función y nos va a loguear esto en la consola.
app.listen(3000, () => console.log("Server running on port 3000"));

//app.get("/url", (req, res, next) => res.json([ "Paris", "Barcelona", "Barranquilla", "Montevideo", "Santiago de Chile", "Mexico DF", "Nueva York" ]));
var ciudades = [ "Paris", "Barcelona", "Barranquilla", "Montevideo", "Santiago de Chile", "Mexico DF", "Nueva York" ];
app.get("/ciudades", (req, res, next) => res.json(ciudades.filter((c) => c.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1)));
//en el req es la solicitud que nos hacen, y el res es la respuesta

var misDestinos = [];
app.get("/my", (req, res, next) => res.json(misDestinos));
app.post("/my", (req, res, next) => {
  console.log(req.body);
  //misDestinos = req.body;
  //Ya que en el body de destinos-api-client.models.ts posteamos un nuevo objeto
  misDestinos.push(req.body.nuevo);
  res.json(misDestinos);
});