'use strict';
const { Router } = require('express');
const nodeMailer = require('nodemailer');
const Encargado_recinto = require('../models/encargado-recinto.model');
const router = Router();

// crea una cadena alfanumérica aleatoria de tamaño deseado
const Crear_contrasenna = (tamano) => {
    let resultado = "";
    const caracteres = '0123456789$%#@+abcdefgñhijklmnopqrÑstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = tamano; i > 0; --i) {
        resultado += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    return resultado;
};

router.get('/obtener-encargado-recinto', async function (req, res) {
    try {
        //Buscamos todo los encargados de recintos
        const resultados = await Encargado_recinto.findById(req.query.id);


        res.json({ estado: true, datos: resultados });
    } catch (error) {
        //Capturamos los errores
        res.json({ estado: false, tipo: 'error', msg: 'No se pudo listar en este momento los encargados de recintos' });
    };
});

router.post('/modificar-encargado-recinto', async function (req, res) {
    const id = req.body.id;

    const nombre_completo = req.body.nombre_completo;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const telefonos = req.body.telefonos;
    const genero = req.body.genero;
    const edad = req.body.edad;

    var value_para_actualizar = {
            nombre_completo,

            fecha_nacimiento,
            telefonos,
            genero,
            edad
    };
    try {
        await Encargado_recinto.findByIdAndUpdate(id, value_para_actualizar).then(result => {
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


router.post('/registrar-encargado-recinto', async function (req, res) {
    const nombre_completo = req.body.nombre_completo;
    const correo_electronico = req.body.correo_electronico.trim().toLowerCase();
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const telefonos = req.body.telefonos;
    const genero = req.body.genero;
    const edad = req.body.edad;

    try {
        //Creamos el contrasena temporal
        let contrasenna = Crear_contrasenna(7);

        //Creamos un encargado de recinto
        const encargado = new Encargado_recinto({
            //Datos compartidos
            nombre_completo,
            correo_electronico,
            contrasenna,
            estado: true,
            token: "%7ewefsdfd123sd",
            token_activo: true,
            tipo_usuario: "encargado_de_recinto",

            fecha_nacimiento,
            telefonos,
            genero,
            edad
        });

        //Guardamos el modelo en la BD
        await encargado.save().then(result => {

            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ecoboleto@gmail.com',
                    pass: 'Ecoboleto123'
                }
            });

            let mailOptions = {
                from: 'ecoboleto@gmail.com',
                to: correo_electronico,
                subject: 'Bienvenido a EcoBoleto',
                html: `<hhtml>
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
                <a href="http://127.0.0.1:5500/vistas/iniciar-sesion.html" style="color:#FFF" class="boton">Ingresar a EcoBoleto</a>
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
        const resultados = await Encargado_recinto.find({ "tipo_usuario": "encargado_de_recinto" });
        res.json({ estado: true, datos: resultados });
    } catch (error) {
        //Capturamos los errores
        res.json({ estado: false, tipo: 'error', msg: 'No se pudo listar en este momento los encargados de recintos' });
    };
});

//permite enlazar y exportar el modulo
module.exports = router;