'use strict';

const express=require("express"),
//saco el enrutador de express a una variable
router = express.Router(),
//variable referencia de nuestro archivo model de Descuento
Descuento = require("../models/descuentos.model"),
mongoose = require('mongoose');

//Crear endpoint o URL o ruta especifica para tener una peticion
//PARA REGISTRAR UN PRODUCTO PARA GUARDAR INFO EN LA BASE DE DATOS
//ES DE TIPO POST
//el primer param es el endpoint y que recibe un func con request y response
router.post('/registrar-descuento', function(req, res){
    let body = req.body;
    //esto es una referencia al modelo de productos permite darle .save() en mongo de una
    let nuevo_descuento = new Descuento({
        nombre : body.nombre,
        porcentaje : body.porcentaje,
        estado : body.estado

    });
    //cuando se salva sea que haya error o buena respuesta siempre hay que revolver una respuesta
    nuevo_descuento.save(
        function(err, Descuento){
            if(err){
                res.json({
                    resultado: false,
                    msg: 'El Descuento no se pudo registrar, ocurrio el siguiente error',
                    err
                });
            }else{
                res.json({
                    resultado:true,
                    Descuento
                });
            }
    });
});

router.get('/registrar-descuento', function(req, res){
    Descuento.find(
        function(err,DescuentosBD){
            if(err){
                res.json({
                    resultado: false,
                    msg:'No se encontraron Descuentos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    descuentos: DescuentosBD
                })
            }
        }
    );
});

module.exports = router;