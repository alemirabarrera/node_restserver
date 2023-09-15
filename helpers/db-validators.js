
const { Categoria, Role, Usuario } = require("../models");

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
  
const existeIdUsuario = async(id ="") =>{
    const existeIdMongo = await Usuario.findById(id);
    if(!existeIdMongo){
        throw new Error(`El id: ${ id } no existe en la DB.`);   
    }
}
const existeCategoria = async(id ="") =>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id de categoria: ${ id } no esta registrado.`);   
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeIdUsuario,
    existeCategoria
}