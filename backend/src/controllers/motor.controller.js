import Motor from '../models/motor.models.js';

export const createMotor = async (req, res) => {
    try {
        const motor = new Motor(req.body);
        await motor.save();
        res.status(201).json(motor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getMotores = async (req, res) => {
    try {
        const motores = await Motor.find();
        res.json(motores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};