'use strict';

const mongoose = require('mongoose');

const evento_schema = new mongoose.Schema(
    {
        organizador_evento: { type: String, required: false, unique: false },
        nombre_evento: { type: String, required: true, unique: true },
        tipo_evento: { type: String, required: true, unique: false },
        /*[{
            id: { type: String, required: false, unique: false },
            nombre: { type: String, required: false, unique: false },
        }],*/
        foto_evento: { type: String, required: false, unique: false },
        recinto_evento: { type: String, required: true, unique: false },
        /*[{
            id: { type: String, required: false, unique: false },
            nombre: { type: String, required: false, unique: false },
        }],*/
        descripcion_evento: { type: String, required: true, unique: false },
        entrada_evento: { type: Number, required: true, unique: false },
        asistentes_evento: { type: Number, required: true, unique: false },
        limite_evento: { type: Number, required: true, unique: false },
        estado: { type: String, required: true, unique: false },
        fechas: [{ type: String, required: true }],
        impuestos: [{ type: String, required: true }],
        descuentos: [{ type: String, required: true }]
    }
);

//modelo, schema en que se apoya, nombre de la coleccion en la DB
module.exports = mongoose.model('Eventos', evento_schema, 'eventos');