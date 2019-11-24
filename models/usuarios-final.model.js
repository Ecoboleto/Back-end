'use strict'

const mongoose = require('mongoose');

const usuarios_schema = new mongoose.Schema({

    correo: { type: String, required: true, unique: true },
    primer_nombre: { type: String, required: true },
    segundo_nombre: { type: String, required: false },
    primer_apellido: { type: String, required: true },
    segundo_apellido: { type: String, required: false },
    contrasenna: {type: String, required: true}, 
    fecha_nacimiento: { type: String, required: true },
    edad: {type: String, required: true}, 
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    genero: { type: String, required: true },
    avatar: {type: String, required: true}

})

module.exports = mongoose.model('Usuario_final', usuarios_schema, 'usuarios_finales')