/* File para definir todo el squema*/
const mongoose = require("mongoose");

const impuesto_schema = new mongoose.Schema({
    /*Aqui van las definiciones que vimos en pizarra */
    id_codigo: { type: String, required: false, unique: true },
    nombre: { type: String, required: false, unique: true },
    porcentaje: { type: Number, required: false, unique: false}
});

//Modelo, schema en que se apoya, nombre de la colección en la base de datos
module.exports = mongoose.model("Impuesto", impuesto_schema, 'impuestos');
//Modelo de moogoose se llama Impuesto y a nivel de db se llama impuestos
//Con esto ya tenemos el primer modelo creado, si no ponemos module export no estamos haciendo visible este modelo por tanto no podremos interactuar con el. 
//Teniendo el modelo se prosigue con el archivo product.route que configurarà las rutas a las cuales este servidor va a responder