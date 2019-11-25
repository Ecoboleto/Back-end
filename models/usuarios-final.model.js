'use strict'

const mongoose = require('mongoose');

const usuarios_schema = new mongoose.Schema({

    primer_nombre: { type: String, required: true },
    segundo_nombre: { type: String, required: false },
    primer_apellido: { type: String, required: true },
    segundo_apellido: { type: String, required: false },
    fecha_nacimiento: { type: String, required: true },
    edad: {type: String, required: true}, 
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    genero: { type: String, required: true },
    avatar: {type: String, required: true},

 
    correo_electronico: { type: String, required: true, unique: true },
    contrasenna: { type: String, required: true },
    estado: { type: Boolean, required: true },
    token: { type: String, required: true },
    token_activo: { type: Boolean, required: true },
    tipo_usuario: { type: String, required: true},

})

module.exports = mongoose.model('Usuario_final', usuarios_schema, 'usuarios')