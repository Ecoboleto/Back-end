'use strict';
const { Schema, model } = require('mongoose');

//Datos compartidos
const usuario_general_Schema = new Schema({
    nombre_completo: { type: String, required: true },
    correo_electronico: { type: String, required: true, unique: true },
    contrasenna: { type: String, required: true },
    estado: { type: Boolean, required: true },
    token: { type: String, required: true },
    token_activo: { type: Boolean, required: true },
    tipo_usuario: { type: String, required: true},
}, { collection: 'usuarios' });

module.exports = model('Usuario_general', usuario_general_Schema)