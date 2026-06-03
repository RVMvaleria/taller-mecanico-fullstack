import Modelo from '../models/modelo.models.js';

export const createModelo = async (req, res)=>{
    try {
        const modelo = new Modelo(req.body);
        await modelo.save();
        res.status(201).json(modelo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getModelos = async (req, res) => {
    try {
        const modelos = await Modelo.find().populate('marca').populate('motores.motor');
        res.json(modelos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};