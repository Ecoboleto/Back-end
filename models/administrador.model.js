'use strict'; 

'use strict'

const mongoose = require('mongoose');

const admin_schema = new mongoose.Schema({

    correo: { type: String, required: true },
    contrasenna: { type: String, required: true },
    
})

module.exports = mongoose.model('Administrador', admin_schema, 'administrador')