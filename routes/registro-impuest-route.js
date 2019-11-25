'use strict';

const express=require("express"),
//saco el enrutador de express a una variable
router = express.Router(),
//variable referencia de nuestro archivo model de impuesto
Impuesto = require("../models/model-impuesto"),
mongoose = require('mongoose');

//Crear endpoint o URL o ruta especifica para tener una peticion
//PARA REGISTRAR UN PRODUCTO PARA GUARDAR INFO EN LA BASE DE DATOS
//ES DE TIPO POST
//el primer param es el endpoint y que recibe un func con request y response
router.post('/registrar-impuestos', function(req, res){
    let body = req.body;
    //esto es una referencia al modelo de productos permite darle .save() en mongo de una
    let nuevo_impuesto = new Impuesto({
        id_codigo : body.id_codigo,
        nombre : body.nombre,
        porcentaje : body.porcentaje
    });
    //cuando se salva sea que haya error o buena respuesta siempre hay que revolver una respuesta
    nuevo_impuesto.save(
        function(err, Impuesto){
            if(err){
                res.json({
                    resultado: false,
                    msg: 'El impuesto no se pudo registrar, ocurrio el siguiente error',
                    err
                });
            }else{
                res.json({
                    resultado:true,
                    Impuesto
                });
            }
    });
});

router.get('/registrar-impuestos', function(req, res){
    Impuesto.find(
        function(err,ImpuestosBD){
            if(err){
                res.json({
                    resultado: false,
                    msg:'No se encontraron impuestos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    productos: ImpuestosBD
                })
            }
        }
    );
});

module.exports = router;