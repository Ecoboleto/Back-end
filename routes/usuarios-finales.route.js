'use strict'


const nodeMailer = require('nodemailer'),
    express = require('express'),
    Usuario_final = require('../models/usuarios-final.model'),
    mongoose = require('mongoose'),
    router = express.Router();

    // http://localhost:3000/api/registrar-usuarios

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ecoboleto@gmail.com',
        pass: 'Ecoboleto123'
    }
})


// crea una cadena alfanumérica aleatoria de tamaño deseado
    const Crear_contrasenna = (tamano) => {
    const caracteres = '0123456789$%#@+abcdefgñhijklmnopqrÑstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let resultado = ''; 
    for (let i = tamano; i > 0; --i) {
    resultado += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    return resultado;
};

router.post('/registrar-usuarios-finales', function (req, res) {

    const contrasenna = Crear_contrasenna(7);
    let body = req.body;

    let nuevo_usuario = new Usuario_final({

        correo: body.correo.trim().toLowerCase(),
        primer_nombre: body.primer_nombre,
        segundo_nombre: body.segundo_nombre,
        primer_apellido: body.primer_apellido,
        segundo_apellido: body.segundo_apellido,
        contrasenna,
        fecha_nacimiento: body.fecha_nacimiento,
        edad: body.edad,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        genero: body.genero,
        avatar: body.avatar,

        token: "%5ebefrttgy56ju8l",
        token_activo: true,
        tipo_usuario: "usuario_final"


    });

    nuevo_usuario.save(function (err, usuarioBD) {


        if (err) {

            if (error.code == '11000') {
                res.json({
                    //siempre se debe devolver una respuesta
                    resultado: false,
                    msg: 'El correo ya existe',
                    err
                });
            } else {
                res.json({
                    //siempre se debe devolver una respuesta
                    resultado: false,
                    msg: 'El usuario no se pudo registrar, ha ocurrido el siguiente error',
                    err
                });
            };
        } else {

            let mailOptions = {
                from: 'ecoboleto@gmail.com',
                to: nuevo_usuario.correo,
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
                    color: #000;
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
                      <h1 >Bienvenido a EcoBoleto</h1>
                    <h2 >Su boleteria en línea</h2>
                    
                    <p >Saludos ${nuevo_usuario.primer_nombre} le agradecemos por escoger  
                    los servicios de EcoBoleto</p>
                    <p > correo electrónico asociado es: ${nuevo_usuario.correo} </p>
                    <p>Su contraseña temporal es: ${nuevo_usuario.contrasenna}  </p>
                    <p>Para ingresar visite el siguiente<p> 
                      <a href="http://localhost:5500/vistas/iniciar-sesion.html" style = 'color: #FFF'class="boton">Ingresar a EcoBoleto</a>
                    </div>
                    
                  </body>
                  
                </html>
                                                
                Resources`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Correo fue enviado' + info.response);
                }
            })

            res.json({
                resultado: true,
                usuarioBD

            })
        };

    });
});

router.get('/listar-filtrar-usuario-final', function (req, res) {
    Usuario_final.find(
        function (err, usuarioBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron usuarios registrados',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    clientes: usuarioBD
                })
            }
        }
    );
});


module.exports = router;