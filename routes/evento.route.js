'use strict'

const express = require('express'),
    router = express.Router(),
    Recintos = require('../models/recinto.model'),
    Impuestos = require('../models/impuestos.model'),
    Descuentos = require('../models/descuentos.model'),
    Eventos = require('../models/eventos.model'),
    mongoose = require('mongoose');


router.get('/listar-recinto-evento', function (req, res) {
    Recintos.find(
        function (err, recintosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron tipos de eventos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    recintos: recintosBD
                })
            }
        }
    );
});

router.get('/listar-impuestos', function (req, res) {
    Impuestos.find(
        function (err, impuestosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron tipos de eventos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    impuestos: impuestosBD
                })
            }
        }
    );
});

router.get('/listar-descuentos', function (req, res) {
    Descuentos.find(
        function (err, descuentosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron tipos de eventos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    descuentos: descuentosBD
                })
            }
        }
    );
});


router.post('/registrar-evento', function (req, res) {
    let body = req.body;
    let upd = body._id;
    let nombre_evento = body.nombre_evento.charAt(0).toUpperCase() + body.nombre_evento.substr(1).toLowerCase()
    let nuevo_evento = new Eventos({
        organizador_evento: body.organizador_evento,
        nombre_evento,
        tipo_evento: body.tipo_evento,
        foto_evento: body.foto_evento,
        recinto_evento: body.recinto_evento,
        descripcion_evento: body.descripcion_evento,
        entrada_evento: body.entrada_evento,
        asistentes_evento: body.asistentes_evento,
        limite_evento: body.limite_evento,
        estado: 'Activo',
        fechas: body.fechas,
        impuestos: body.impuestos,
        descuentos: body.descuentos
    });
    nuevo_evento.save(
        function (err, eventosBD) {
            if (err) {
                res.json({
                    estado: false,
                    msg: 'El evento no se pudo registrar, ocurrio el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    eventosBD
                });

            }
        }
    );
    /*Eventos.update({_id: upd}, {
        $push: {
            'tipo_evento': {
                id: body.tipo_evento_id,
                nombre: body.tipo_evento_nombre
            }
        }
    });*/

});




router.get('/listar-evento', function (req, res) {
    Eventos.find(
        function (err, eventosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron tipos de eventos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    eventos: eventosBD
                })
            }
        }
    );
});


router.get('/obtener-evento-id', function(req, res) {
 
    let id = req.query._id;
 
    Eventos.findOne({ _id: id }, function(err, eventosBD) {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se encontró ningún cliente con ese correo',
                err
            });
        } else {
            return res.json({
                success: true,
                eventos: eventosBD
            });
        }
    })
});


module.exports = router;