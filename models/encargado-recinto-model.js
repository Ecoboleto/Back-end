'use strict';
const { Schema, model } = require('mongoose');

const encargado_recinto_schema = new Schema({
    //Datos compartidos
    nombre_completo: { type: String, required: true },
    correo_electronico: { type: String, required: true, unique: true },
    contrasenna: { type: String, required: true },
    estado: { type: Boolean, required: true },
    token: { type: String, required: true },
    token_activo: { type: Boolean, required: true },
    tipo_usuario: { type: String, required: true},

    fecha_nacimiento: { type: String, required: true },
    edad: { type: Number, required: true },
    telefonos: [{ type:String, required: true}],
    genero: { type: String },
    estado: { type: String, required: true}
},{ collection: 'usuarios' });

module.exports = model('Encargado_recinto',encargado_recinto_schema);
