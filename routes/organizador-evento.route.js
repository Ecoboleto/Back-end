'use strict';
const { Router } = require('express');
const nodeMailer = require('nodemailer');
const Organizador_evento = require('../models/organizador-eventos.model');
const router = Router();

// crea una cadena alfanumérica aleatoria de tamaño deseado
const crear_contrasenna = (tamano) => {
    let resultado = "";
    const caracteres = '0123456789$%#@+abcdefgñhijklmnopqrÑstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = tamano; i > 0; --i) {
        resultado += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    return resultado;
};

router.post('/registrar-organizador-evento', async function (req, res) {
    //Datos del organizador de evento
    const nombre_empresa = req.body.nombre_empresa;
    const log = req.body.log;
    const tipo_cedula = req.body.tipo_cedula;
    const cedula = req.body.cedula;
    const nombre_comercial = req.body.nombre_comercial;
    const anos_experiencia = req.body.anos_experiencia;
    const provincia = req.body.provincia;
    const canton = req.body.canton;
    const distrito = req.body.distrito;
    const direccion_exacta = req.body.direccion_exacta;

    //Contato asociado
    let correo_electronico = req.body.correo_electronico;
    const nombre_completo = req.body.nombre_completo;
    const telefonos = req.body.telefonos;
    const genero = req.body.genero;
    const fecha = req.body.fecha;

    try {
        //Creamos el contrasena temporal
        let contrasenna = crear_contrasenna(7);

        //creamos la url de verificación
        //const base_url = `http://localhost:5500/verificación`;
        //const parammetro_token = `token=${token}`;
        //const parammetro_usuario = `nombre-usuario=${nombre_completo}`;
        //const url_activacion = `${base_url}?${parammetro_token}&${parammetro_usuario}`;

        //organizador de eventos
        correo_electronico = correo_electronico.trim().toLowerCase();
        const encargado = new Organizador_evento({
            //Datos compartidos
            nombre_completo,
            correo_electronico,
            contrasenna,
            estado: true,
            token: "%7ewed123sd",
            token_activo: true,
            tipo_usuario: "organizador_evento",

            //Datos del organizador de evento
            nombre_empresa,
            log,
            tipo_cedula,
            cedula,
            nombre_comercial,
            anos_experiencia,
            provincia,
            canton,
            distrito,
            direccion_exacta,

            //Contato asociado   
            telefonos,
            genero,
            fecha
        });

        //Guardamos el modelo en la BD
        await encargado.save().then(result => {

            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ecoboleto@gmail.com',
                    pass: 'Ecoboleto123'
                }
            })

            let mailOptions = {
                from: 'ecoboleto@gmail.com',
                to: correo_electronico,
                subject: 'Bienvenido a EcoBoleto',
                html: `<html>
            <head>
              <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
              <style>
               .wrapper{
                    background : #A3DE83;
                    font-family: 'Roboto', sans-serif;
                }
                .container{
                    margin: 0 auto;
                    background: #fff;
                    width: 500px;
                    text-align: center;
                    padding: 10px;
                    color:#000;
                }
                .boton{
                    background: #FA4659;
                    color: #FFF;
                    display: block;
                    padding: 15px;
                    text-decoration: none;
                    width: 50%;
                    margin: 0 auto;
                }
            </style>
            </head>
            <body class="wrapper">
              <div class="container">
              <h1>Bienvenido a EcoBoleto</h1>
              <h2>Su boleteria en linea</h2>
              
              <p>Saludos ${nombre_completo} le agradecemos por escoger utilizar los servicios de EcoBoleto</p>
              <p>El correo electrónico asociado es: ${correo_electronico} </p>
              <p>Su contraseña temporal es: ${contrasenna}  </p>
              <p>Para ingresar visite el siguiente<p> 
                <a href="http://localhost:5500/vistas/iniciar-sesion.html" style="color:#FFF" class="boton">Ingresar a EcoBoleto</a>
              </div>              
            </body>            
            </html>
            Resources`
            };

            //enviamos el correo
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    const tipo = 'Envió corre electrónico';
                    const msg = 'No se pudo registrar el organizador de eventos y a su asociado';
                    return res.json({ estado: false, tipo, msg });
                }
            });

            res.json({ estado: true, id: result._id });
        })
    } catch (error) {
        //Capturamos los errores
        let tipo; let msg;

        if (error.code == '11000') {
            tipo = 'validacion'
            msg = 'El correo electrónico se encuentra en uso, ingrese otro correo electrónico'
        } else {
            tipo = 'registro'
            msg = 'No se pudo registrar el organizador de eventos y a su asociado';
        };
        res.json({ estado: false, tipo, msg });
    };
});

router.get('/listar-organizador-evento', async function (req, res) {
    try {
        //Buscamos todo los organizadores de eventos
        const resultados = await Organizador_evento.find();
        res.json({ estado: true, datos: resultados });
    } catch (error) {
        //Capturamos los errores
        res.json({ estado: false, tipo: 'error', msg: 'No se pudo listar en este momento los organizadores de eventos' });
    };
});

//permite enlazar y exportar el modulo
module.exports = router;