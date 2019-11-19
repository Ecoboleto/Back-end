'use strict';

const mongoose = require('mongoose');

const tipo_evento_schema = new mongoose.Schema(
    {
        tipo_evento: {type: String, required: true, unique: true},
        estado: {type: String, required: true, unique: false}
    }
);

//modelo, schema en que se apoya, nombre de la coleccion en la DB
module.exports = mongoose.model('Tipos_Eventos', tipo_evento_schema, 'tipos_eventos');
