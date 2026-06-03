import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next)=>{
    const {token} = req.cookies;

    if(!token) {
        return res.status(401)
        .json ({message:"No hay token autorización denegada"});
    }
    
    jwt.verify(token, TOKEN_SECRET, (err, user)=>{
        if(err) {
            return res.status(403)
            .json({message:"Token Invalido"});
        }

        req.user = user;
        next();
    })
}


//req = Recibir datos del cliente (navegador o potman)
//res = Para responder con datos al navegador o portman
//next =Indica que existe otra funcion siguiente por cejecutar]

/*
    Si el middleware se ejecuta correctamente, al fianl se manda llamar a la funcion next

    si hay algun error en el middleware, ahi se detiene la ejecución
*/