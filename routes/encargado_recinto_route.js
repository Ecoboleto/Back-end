'use strict';

const { Router } = require('express');
const Encargado_recinto = require('../models/encargado_recinto_model');

const router = Router();

router.post('/registrar-encargado-recinto', async function (req, res) {
    const nombre_completo = req.body.nombre_completo;
    const correo_electronico = req.body.correo_electronico;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const telefonos = req.body.telefonos;
    const genero = req.body.genero;
    const edad = req.body.edad;

    try {
        //Creamos un encargado de recinto
       const encargado = new Encargado_recinto({
            nombre_completo,
            correo_electronico,
            fecha_nacimiento,
            telefonos,
            genero,
            edad
        });

        //Guardamos el modelo en la BD
        await encargado.save().then(result => {
            res.json({ estado: true , id: result._id })
        })
    } catch (error) {
        //Capturamos los errores
        let tipo; let msg;

        if (error.code == '11000') {
            tipo = 'validacion'
            msg = 'EL correo electrónico se encuentra en uso, ingrese otro correo electrónico'
        } else {
            tipo = 'error'
            msg = 'No se pudo registrar el encargado de recinto';
        };
        res.json({ estado: false, tipo, msg });
    };
});

router.get('/listar-encargados-recinto', async function (req, res) {
    try {
        //Buscamos todo los encargados de recintos
       const resultados =  await Encargado_recinto.find();
       res.json({ estado: true , datos: resultados});
    } catch (error) {
        //Capturamos los errores
        res.json({ estado: false, tipo : 'error', msg : 'No se pudo listar en este momento los encargados de recintos' });
    };
});

//permite enlazar y exportar el modulo
module.exports = router;