'use strict';
const { Router } = require('express');
const Recinto = require('../models/recinto.model');
const router = Router();

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
            msg = 'EL recinto se encuentra en ingresado, ingrese otro recinto'
        } else {
            tipo = 'error'
            msg = 'No se pudo registrar el recinto';
        };
        res.json({ estado: false, tipo, msg });
    };
});

router.get('/listar-recinto', async function (req, res) {
    try {
        //Buscamos todo los recintos
        const resultados = await Recinto.find();
        res.json({ estado: true, datos: resultados });
    } catch (error) {
        //Capturamos los errores
        res.json({ estado: false, tipo: 'error', msg: 'No se pudo listar en este momento los recintos' });
    };
});

//permite enlazar y exportar el modulo
module.exports = router;