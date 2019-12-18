"use strict";

const express = require("express"),
  router = express.Router(),
  Tarjeta = require("../models/tarjeta.model"),
  mongoose = require("mongoose");

router.post("/registrar-tarjeta", function (req, res) {
  let body = req.body;
  let nueva_tarjeta = new Tarjeta({
    id_usuario: body.id_usuario,
    nombre: body.nombre,
    numero: body.numero,
    mes: body.mes,
    anno: body.anno,
    codigo: body.codigo,
    estado: true
  });

  nueva_tarjeta.save(function (err, tarjetaBD) {
    if (err) {
      res.json({
        resultado: false,
        msg: "La tarjeta no se pudo registrar, ocurrió el siguiente error",
        err
      });
    } else {
      res.json({
        resultado: true,
        tarjetaBD
      });
    }
  });
});

router.get("/listar-personas", function (req, res) {
  Persona.find(function (err, personasBD) {
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
