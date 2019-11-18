"use strict";

const mongoose = require("mongoose");
const persona_schema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  numero: { type: Number, required: true, unique: false },
  mes: { type: Number, required: true, unique: true },
  anno: { type: Number, required: true, unique: true },
  codigo: { type: String, required: true, unique: true },
  estado: { type: String, required: true, unique: false }
});

module.exports = mongoose.model("Tarjeta", persona_schema, "tarjetas");
