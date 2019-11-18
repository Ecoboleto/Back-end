"use strict";

const express = require("express"),
  router = express.Router(),
  Tarjeta = require("../models/tarjeta.model"),
  mongoose = require("mongoose");

router.post("/registrar-persona", function(req, res) {
  let body = req.body;
  let nuevo_persona = new Persona({
    cedula: body.cedula,
    nombre: body.nombre,
    correo: body.correo,
    estado: "activo"
  });

  nuevo_persona.save(function(err, personaBD) {
    if (err) {
      res.json({
        resultado: false,
        msg: "La persona no se pudo registrar, ocurrió el siguiente error",
        err
      });
    } else {
      res.json({
        resultado: true,
        personaBD
      });
    }
  });
});

router.get("/listar-personas", function(req, res) {
  Persona.find(function(err, personasBD) {
    if (err) {
      res.json({
        resultado: false,
        msg: "No se encontraron personas",
        err
      });
    } else {
      res.json({
        resultado: true,
        personas: personasBD
      });
    }
  });
});

module.exports = router;
