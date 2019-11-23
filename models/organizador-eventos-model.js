const { Schema, model } = require('mongoose');

const organizador_evento_schema = new Schema({
    //Datos compartidos
    nombre_completo: { type: String, required: true },
    correo_electronico: { type: String, required: true, unique: true },
    contrasenna: { type: String, required: true },
    estado: { type: Boolean, required: true },
    token: { type: String, required: true },
    token_activo: { type: Boolean, required: true },
    tipo_usuario: { type: String, required: true},

    //Datos del organizador de evento
    nombre_empresa: { type: String, required: true },
    log: { type: String, required: true },
    tipo_cedula: { type: String, required: true },
    cedula:{ type: String, required: true },
    nombre_comercial: { type: String, required: true },
    anos_experiencia: { type: String, required: true },
    provincia:{ type: String, required: true },
    cantos:{ type: String, required: true },
    distrito:{ type: String, required: true },
    direccion_exacta:{ type: String, required: true },

    //Contato asociado   
    telefonos:[{ type:String, required: true}],    
    genero:{ type: String },
    fecha_nacimiento: { type: String, required: true },
    edad: { type: Number, required: true },
},{ collection: 'usuarios' });

module.exports = model('Organizador_eventos',organizador_evento_schema);
