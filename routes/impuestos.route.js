'use strict';

const express=require("express"),
//saco el enrutador de express a una variable
router = express.Router(),
//variable referencia de nuestro archivo model de impuesto
Impuesto = require("../models/impuestos.model"),
mongoose = require('mongoose');

//Crear endpoint o URL o ruta especifica para tener una peticion
//PARA REGISTRAR UN PRODUCTO PARA GUARDAR INFO EN LA BASE DE DATOS
//ES DE TIPO POST
//el primer param es el endpoint y que recibe un func con request y response
router.post('/registrar-impuesto', function(req, res){
    let body = req.body;
    //esto es una referencia al modelo de productos permite darle .save() en mongo de una
    let nuevo_impuesto = new Impuesto({
        nombre : body.nombre,
        porcentaje : body.porcentaje,
        estado : body.estado
    });
    //cuando se salva sea que haya error o buena respuesta siempre hay que revolver una respuesta
    nuevo_impuesto.save(
        function(err, impuestosBD){
            if(err){
                res.json({
                    resultado: false,
                    msg: 'El impuesto no se pudo registrar, ocurrio el siguiente error',
                    err
                });
            }else{
                res.json({
                    resultado:true,
                    impuestosBD
                });
            }
    });
});

router.get('/listar-impuestos', function (req, res) {
    Impuesto.find(
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

router.get('/modificar-impuesto-id',function(req,res){
    let id = req.query._id;
    Impuesto.findById({_id:id},function(err,impuestoBD){
       if(err){
           return res.json({
                succes:false,
                msj:'No se encontró ningún descuento',
                err
           });
       } else{
           return res.json({
            succes:true,
            impuesto:impuestoBD
           });
       }
    })
});

router.post('/modificar-impuesto',function(req,res){
    let body = req.body;
    let id=body.id;
    Impuesto.updateOne({_id:id},{
        $set:req.body
    },
    function(err,info){
        if(err){
            res.json({
                resultado:false,
                msg:'No se pudo modificar el impuesto',
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

router.post('/modificar-estado-impuesto',function(req,res){
    let body = req.body;
    let id=body.id;
    Impuesto.updateOne({_id:id},{
        $set:req.body
    },
    function(err,info){
        if(err){
            res.json({
                resultado:false,
                msg:'No se pudo modificar el impuesto',
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