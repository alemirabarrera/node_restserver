const { request, response } = require("express")


const adminRole = (req= request, res = response, next) =>{
    if(!req.usuario){
        return res.status(500).json({
            "msg": "Se quiere verificar el rol sin validar el token primero"
        })    
    }
    const {rol, nombre} = req.usuario;

    if(rol!=="ADMIN_ROL"){
        return res.status(401).json({
            "msg": `${nombre} no es un usuario administrador`
        })    
    }
    next();
}


const tieneRole = (...roles) =>{    
    return (req= request, res = response, next) =>{
        console.log(roles, req.usuario.rol)
        

        if(!req.usuario){
            return res.status(500).json({
                "msg": "Se quiere verificar el rol sin validar el token primero"
            })    
        }
        
        const {rol, nombre} = req.usuario;

        if(!roles.includes(rol)){
            return res.status(401).json({
                "msg": `${nombre} no tiene un rol permitido`
            })    
        }
    
        next();
    }
}

module.exports = {
    adminRole,
    tieneRole
}