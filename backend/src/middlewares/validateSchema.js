export const validateSchema = (schema) => (req, res, next) =>{
    try{
        //parse valida el objeto req.body contra el esquema definido
        //si no hay error se ejecuta next
        console.log(req.body); //<-- Que es lo que llega desde el front
        schema.parse(req.body);
        next();
    } catch (error){
        //visualizar los errores de zod
        console.log(error);
        return res.status(400)
        .json({message: error.issues.map( (error)=> error.message)
        })
    }//fin del catch
}//fin de validateSchema