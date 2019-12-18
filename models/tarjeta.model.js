"use strict";

const mongoose = require("mongoose");
const persona_schema = new mongoose.Schema({
  id_usuario: { type: String, required: true, unique: false },
  nombre: { type: String, required: true, unique: true },
  numero: { type: Number, required: true, unique: true },
  mes: { type: Number, required: true},
  anno: { type: Number, required: true},
  codigo: { type: String, required: true},
  estado: { type: Boolean, required: true, unique: false }
},{ collection: 'tarjetas' });

module.exports = mongoose.model('Tarjeta', persona_schema);
