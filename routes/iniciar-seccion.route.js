'use strict';
const { Router } = require('express');
const Usuario_general = require('../models/usuario-general.model');
const router = Router();

router.post('/inicio-sesion', async function (req, res) {
    const correo_electronico = req.body.correo;
    const contrasenna = req.body.contrasenna;

    try {
        //Buscamos todo los organizadores de eventos
        const resultado = await Usuario_general.findOne({correo_electronico,contrasenna, token_activo: true });
        if (resultado == null) {
            res.json({ estado: false, msg: 'Credenciales incorrectas' });
        } else {
            res.json({ estado: true, datos: resultado });
        }
    } catch (error) {
        //Capturamos los errores
        res.json({ estado: false, msg: 'No se puede iniciar sección en este momento' });
    };
});

//permite enlazar y exportar el modulo
module.exports = router;
