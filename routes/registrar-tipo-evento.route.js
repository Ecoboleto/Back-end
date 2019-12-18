'use strict'

const express = require('express'),
    router = express.Router(),
    Tipos_Eventos = require('../models/registrar-tipo-evento-model'),
    mongoose = require('mongoose');

router.post('/registrar-tipo-evento', function (req, res) {
    let tipo_evento = req.body.tipo_evento.charAt(0).toUpperCase() + req.body.tipo_evento.substr(1).toLowerCase()

    let nuevo_tipo_evento = new Tipos_Eventos({
        tipo_evento,
        estado: 'Activo'
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

router.get('/obtener-tipo-evento-id', function(req, res) {
 
    let id = req.query._id;
 
    Tipos_Eventos.findOne({ _id: id }, function(err, tipos_eventosBD) {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se encontró ningún tipo de evento',
                err
            });
        } else {
            return res.json({
                success: true,
                tipos_eventos: tipos_eventosBD
            });
        }
    })
});

router.post('/modificar-tipo-evento', function(req, res) {
    let body = req.body;
    Tipos_Eventos.findOneAndUpdate({ _id: body._id }, {
            $set: req.body
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el tipo de evento',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});

module.exports = router;
