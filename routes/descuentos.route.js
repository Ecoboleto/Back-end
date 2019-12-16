'use strict';

const express = require("express"),
    //saco el enrutador de express a una variable
    router = express.Router(),
    //variable referencia de nuestro archivo model de Descuento
    Descuento = require("../models/descuentos.model"),
    mongoose = require('mongoose');

//Crear endpoint o URL o ruta especifica para tener una peticion
//PARA REGISTRAR UN PRODUCTO PARA GUARDAR INFO EN LA BASE DE DATOS
//ES DE TIPO POST
//el primer param es el endpoint y que recibe un func con request y response
router.post('/registrar-descuento', function (req, res) {
    let body = req.body;
    //esto es una referencia al modelo de productos permite darle .save() en mongo de una
    let nuevo_descuento = new Descuento({
        nombre: body.nombre,
        porcentaje: body.porcentaje,
        estado: body.estado
    });
    //cuando se salva sea que haya error o buena respuesta siempre hay que revolver una respuesta
    nuevo_descuento.save(
        function (err, descuentoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El Descuento no se pudo registrar, ocurrio el siguiente error',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    descuentoBD
                });
            }
        });
});

router.get('/listar-descuentos', function (req, res) {
    let id =req.params.id;
    Descuento.find(
        function (err, DescuentosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron Descuentos',
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
router.get('/modificar-descuento-id',function(req,res){
    let id = req.query._id;
    Descuento.findById({_id:id},function(err,descuentoBD){
       if(err){
           return res.json({
                succes:false,
                msj:'No se encontró ningún descuento',
                err
           });
       } else{
           return res.json({
            succes:true,
            descuento:descuentoBD
           });
       }
    })
});

router.post('/modificar-descuento',function(req,res){
    let body = req.body;
    let id=body.id;
    Descuento.updateOne({_id:id},{
        $set:req.body
    },
    function(err,info){
        if(err){
            res.json({
                resultado:false,
                msg:'No se pudo modificar el descuento',
                err
            });
        }else{
            res.json({
                resultado:true,
                info:info

            });
        }
    });
});

router.post('/modificar-estado-descuento',function(req,res){
    let body = req.body;
    let id=body.id;
    Descuento.updateOne({_id:id},{
        $set:req.body
    },
    function(err,info){
        if(err){
            res.json({
                resultado:false,
                msg:'No se pudo modificar el descuento',
                err
            });
        }else{
            res.json({
                resultado:true,
                info:info

            });
        }
    });
});


module.exports = router;