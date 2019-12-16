'use strict';
const mongoose = require("mongoose");

const recinto_schema = new mongoose.Schema({
    nombre_recinto: { type: String, required: true, unique: true },
    fotos: [{ type: String, required: true }],
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    direccion_exacta: { type: String, required: true },
    geolocalizacion: { type: String, required: true },
    capacidad_asientos_tradicionales: { type: String, required: true },
    capacidad_asientos_especiales: { type: String, required: true },
    capacidad: { type: String, required: true },
    encargado_asociado_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Encargado_recinto' },
    estado: { type: Boolean, required: true }
}, { collection: 'recinto' });

module.exports = mongoose.model('Recinto', recinto_schema);