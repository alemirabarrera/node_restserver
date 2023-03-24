const Role = require('../models/role');
const  Usuario  = require("../models/usuario");

//verificar si es un rol valido contra DB
const esRolValido = async (rol='') =>{
    const existeRol = await Role.findOne({ rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en DB`);
    }
}


 //verificar si el correo existe  en la DB 
 const emailExiste =async (correo ="")=>{    
    const existeCorreo =await Usuario.findOne({ correo});
    if(existeCorreo){
        throw new Error('Ese correo ya esta registrado');
        //return res.status(400).json({ msg:'Ese correo ya esta registrado'});
    }    
}



 //Verificar si existe el id de usuario en DB
 const existeUsuarioPorId =async (id)=>{    
    const existeID =await Usuario.findById(id);
    if(!existeID){
        throw new Error(`el id ${id} no existe en la DB`);
        //return res.status(400).json({ msg:'Ese correo ya esta registrado'});
    }    
}


module.exports = {
    esRolValido,
    emailExiste, 
    existeUsuarioPorId
}