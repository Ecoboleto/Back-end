'use strict'


const nodeMailer = require('nodemailer'),
    express = require('express'),
    Usuario = require('../models/usuario-general.model'),
    mongoose = require('mongoose'),
    router = express.Router();



router.get('/recuperar-contrasenna', function (req, res) {

    Usuario.findOne({ correo: req.body.correo_electronico }).then(
        function (usuario) {
            if (usuario) {
                res.json(
                    {
                        success: true,
                        nombre: usuario.nombre_completo,
                        correo: usuario.correo_electronico,
                        contrasenna: usuario.contrasenna
                    }
                );

                let correo = usuario.correo_electronico;
                let contrasenna = usuario.contrasenna;
                let nombre = usuario.nombre_completo;

                nodemailer.createTestAccount((err, account) => {

                    const transporter = nodeMailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'ecoboleto@gmail.com',
                            pass: 'Ecoboleto123'
                        }
                    })



                    let mailOptions = {
                        from: 'ecoboleto@gmail.com',
                        to: Usuario.correo,
                        subject: 'Contraseña recuperada',
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
                            
                            <p >Saludos ${Usuario.nombre} le agradecemos por escoger  
                            los servicios de EcoBoleto</p>
                            <p > correo electrónico asociado es: ${Usuario.correo} </p>
                            <p>Su contraseña temporal es: ${Usuario.contrasenna}  </p>
                            <p>Para ingresar visite el siguiente<p> 
                              <a href="http://127.0.0.1:5500/vistas/inciar-sesion.html" style = 'color: #FFF'class="boton">Ingresar a EcoBoleto</a>
                            </div>
                            
                          </body>
                          
                        </html>
                                                        
                        Resources`


                    };

                    transporterEmail.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    });
                });
            } else {
                res.json({
                    success: false,
                    msg: 'El usuario no existe en nuestra base de datos'
                });
            }
        }
    )
})

module.exports = router;