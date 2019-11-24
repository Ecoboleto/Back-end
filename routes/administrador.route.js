'use strict'; 

    const express = require('express'),
    router = express.Router(),
    Administrador = require('../models/administrador.model'),
    mongoose = require('mongoose');


    router.get('/iniciar-sesion', function(req, res) {
        Administrador.find(
            function(err, usuarioBD) {
                if (err) {
                    res.json({
                        resultado: false,
                        msg: 'No se encontraron usuarios registrados',
                        err
                    });
                } else {
                    res.json({
                        resultado: true,
                        clientes: usuarioBD
                    })
                }
            }
        );
    });

    module.exports = router;