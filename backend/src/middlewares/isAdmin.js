import Usuario from '../models/user.models.js';

export const isAdmin = async (req, res, next)=>{
    try {
        const userFound = await Usuario.findById(req.user.id);

        if (!userFound) //no se encontro el id en la bd
            return res.status(400).json({message: ['No autorizado, usuario no encontrado']})

        //verificar si el rol es admin
        if(userFound.rol !== 'admin')
            return res.status(401).json({message:['El usuario no está autorizado para esta operación']})

        //el usuario tiene un rol administrador entonces next
        next();
    } catch (error) {
        return res.status(401).json({message: ['No autorizado para esta operación']});
    }
};//fin de isAdmin




//un archivo de mi misma carpeta:   ./
//una carpeta de un nivel superior:    ../