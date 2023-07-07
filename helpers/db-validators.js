const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol="") =>{
    const existRole = await Role.findOne({ rol });
    if(!existRole){
        throw new Error(`El rol: ${ rol } no esta registrado en la DB `);
    }
}

const emailExiste = async(correo ="") =>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo: ${ correo } ya esta registrado.`);   
    }
}
  
const existeIdMongo = async(id ="") =>{
    const existeIdMongo = await Usuario.findById(id);
    if(!existeIdMongo){
        throw new Error(`El id: ${ id } no existe en la DB.`);   
    }
}
  

module.exports = {
    esRoleValido,
    emailExiste,
    existeIdMongo
}