'use strict';
const { Router } = require('express');
const Recinto = require('../models/recinto.model');
const router = Router();
const Encargado_recinto = require('../models/encargado-recinto.model');

router.post('/registrar-recinto', async function (req, res) {
    const nombre_recinto = req.body.nombre_recinto;
    const fotos = req.body.fotos;
    const provincia = req.body.provincia;
    const canton = req.body.canton;
    const distrito = req.body.distrito;
    const direccion_exacta = req.body.direccion_exacta;
    const geolocalizacion = req.body.geolocalizacion;
    const capacidad_asientos_tradicionales = req.body.capacidad_asientos_tradicionales;
    const capacidad_asientos_especiales = req.body.capacidad_asientos_especiales;
    const capacidad = req.body.capacidad;
    const encargado_asociado_id = req.body.encargado_asociado_id;

    try {
        const recinto = new Recinto({
            nombre_recinto,
            fotos,
            provincia,
            canton,
            distrito,
            direccion_exacta,
            geolocalizacion,
            capacidad_asientos_tradicionales,
            capacidad_asientos_especiales,
            capacidad,
            encargado_asociado_id,
            estado: false
        });

        //Guardamos el modelo en la BD
        await recinto.save().then(result => {
            res.json({ estado: true, id: result._id });
        })
    } catch (error) {
        //Capturamos los errores
        let tipo; let msg;

        if (error.code == '11000') {
            tipo = 'validacion'
            msg = 'El recinto se encuentra registrado, ingrese otro recinto'
        } else {
            tipo = 'error'
            msg = 'No se pudo registrar el recinto';
        };
        res.json({ estado: false, tipo, msg });
    };
});

router.get('/listar-recinto', async function (req, res) {
    try {
        let resultados = await Recinto.find().populate('encargado_asociado_id');
        res.json({ estado: true, datos: resultados });
    } catch (error) {
        //Capturamos los errores
        res.json({ estado: false, tipo: 'error', msg: 'No se pudo listar en este momento los recintos' });
    };
});


router.get('/obtener-recinto', async function (req, res) {
    try {
        //Buscamos todo los encargados de recintos
        const resultados = await Recinto.findById(req.query.id).populate('encargado_asociado_id');
        res.json({ estado: true, datos: resultados });
    } catch (error) {
        //Capturamos los errores
        res.json({ estado: false, tipo: 'error', msg: 'No se pudo listar en este momento los encargados de recintos' });
    };
});

router.post('/modificar-recinto', async function (req, res) {
    const id = req.body.id;

    const fotos = req.body.fotos;
    const provincia = req.body.provincia;
    const canton = req.body.canton;
    const distrito = req.body.distrito;
    const direccion_exacta = req.body.direccion_exacta;
    const geolocalizacion = req.body.geolocalizacion;
    const capacidad_asientos_tradicionales = req.body.capacidad_asientos_tradicionales;
    const capacidad_asientos_especiales = req.body.capacidad_asientos_especiales;
    const capacidad = req.body.capacidad;
    const encargado_asociado_id = req.body.encargado_asociado_id;

    var value_para_actualizar = {
        fotos,
        provincia,
        canton,
        distrito,
        direccion_exacta,
        geolocalizacion,
        capacidad_asientos_tradicionales,
        capacidad_asientos_especiales,
        capacidad,
        encargado_asociado_id
    };

    try {
        await Recinto.findByIdAndUpdate(id, value_para_actualizar).then(result => {
            res.json({ estado: true, id: result._id });
        });
    } catch (error) {
        //Capturamos los errores
        let tipo; let msg;
        tipo = 'error'
        msg = 'No se pudo modificar el encargado de recinto';
        res.json({ estado: false, tipo, msg });
    };
});


//permite enlazar y exportar el modulo
module.exports = router;