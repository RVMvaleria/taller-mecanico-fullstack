import Marca from '../models/marca.models.js';

export const createMarca = async (req, res)=>{
    try {
        const marca = new Marca(req.body);
        await marca.save();
        res.status(201).json(marca);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getMarcas = async (req, res)=>{
    try {
        const marcas = await Marca.find();
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};