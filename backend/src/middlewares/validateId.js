//function idMongoDbValidator (id){
//return true;
//}; //fin de idMongoDbValidator

import mongoose from 'mongoose';

//validacion basica que no este el id vacio
//y su longitud sea de 24 caracteres
function idMongoDbValidator(id){
    if(!id || id.trim().length !== 24)
        return false;

    //validar es formato hex
    const isValidHex = /^[0-9a-fA-F]{24}$/.test(id.trim());
    if(!isValidHex)
        return false;

    return true;
}//fin de idMongoDbValidator


export const validateId = (req,res,next)=>{
    try {
        const { id } = req.params
        console.log("ID recibido:", id);

        //validaciones basicas de vacio, longitud y hex
        const validatedId = idMongoDbValidator(id);

        if (!validatedId)
            return res.status(400).json({message: ['ID inválido, longitud incorrecta']});

        //limpiar el id de espacios en blanco
        const cleanId = id.trim();

        //validamos con mongoose
        if (!mongoose.isValidObjectId(cleanId))
            return res.status(400).json({message: ['Formato de ID no válido para MongoDB']})
        //validar si es posible crear un ObjectId con los datos del ID 
        const ObjectId = mongoose.Types.ObjectId.createFromHexString(cleanId);

        //verifico si el objeto creado es valido 
        if(ObjectId.toString() !== cleanId.toLowerCase())
            return res.status(400).json({message: ['Error al procesar el ID']})

        //validar los IDs "especiales" reservardos para mongodb
        //o IDs sospechosas para testing de ataques
        //o secuencias que nunca generara mongo un ID
        const reservedOrSuspiciousObjectIds = [
            '000000000000000000000000',
            'ffffffffffffffffffffffff',

            //patrones de testing comunes
            'aaaaaaaaaaaaaaaaaaaaaaaa',
            'bbbbbbbbbbbbbbbbbbbbbbbb',
            'cccccccccccccccccccccccc',

            //secuancias obvias
            '0123456789abcdef01234567',
            '1234567890abcdef12345678',

            //palabras o conceptos en hex
            'deadbeefdeadbeefdeadbeef', //"dead beef"
            'cafebabecafebabecafebabe', //"cafe babe"
            'badc0feebadc0feebadc0fee'  //"bad cofee"
        ];

        if(reservedOrSuspiciousObjectIds.includes(cleanId.toLowerCase()))
            return res.status(400).json({message:['Error: ID reservado o sospechoso']})
        next();


    } catch (error) {
        return res.status(400).json({message: ['El ID no es un ObjectId válido']})
    }
};//fin de validateId