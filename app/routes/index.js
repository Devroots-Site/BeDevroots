import express from "express";
import tools from "./tools.js";

const router = express.Router();

// Haupt-API-Endpunkt
router.get('/', (req, res) => {
    res.send('API is online');
});

// Registriere den Tools-Router unter der Basisroute "/docs"
router.use("/docs", tools);

export default router;
