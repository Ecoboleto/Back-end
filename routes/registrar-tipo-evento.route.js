'use strict'

const express = require('express'),
    router = express.Router(),
    Tipos_Eventos = require('../models/registrar-tipo-evento-model'),
    mongoose = require('mongoose');

router.post('/registrar-tipo-evento', function (req, res) {
    let tipo_evento = req.body.tipo_evento.charAt(0).toUpperCase() + req.body.tipo_evento.substr(1).toLowerCase()

    let nuevo_tipo_evento = new Tipos_Eventos({
        tipo_evento,
        estado: 'activo'
    });
    nuevo_tipo_evento.save(
        function (err, tipos_eventosBD) {
            if (err) {
                res.json({
                    estado: false,
                    msg: 'El tipo de evento no se pudo registrar, ocurrio el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    tipos_eventosBD
                });
            }
        });
});


router.get('/listar-tipo-evento', function(req, res) {
    Tipos_Eventos.find(
        function(err, tipos_eventosBD){
            if(err){
                res.json({
                    resultado: false,
                    msg: 'No se encontraron tipos de eventos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    tipos_eventos: tipos_eventosBD
                })
            }
        }
    );
});

module.exports = router;