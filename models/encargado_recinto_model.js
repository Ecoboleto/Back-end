'use strict';
const { Schema, model } = require('mongoose');

const encargado_recinto_schema = new Schema({
    nombre_completo: { type: String, required: true },
    correo_electronico: { type: String, required:true, unique: true },
    fecha_nacimiento: { type: String, required: true },
    edad: { type: Number, required: true },
    telefonos: [{ type:String, required: true}],
    genero: { type: String }
},{ collection: 'Encargados_recintos' });

module.exports = model('Encargado_recinto',encargado_recinto_schema);