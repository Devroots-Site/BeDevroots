import express from "express";
import tools from "./tools.js";
import docs from "./docs.js";
import websites from "./websites.js";
const router = express.Router();

// Haupt-API-Endpunkt
router.get('/', (req, res) => {
    res.send('API is online');
});

// Registriere den Tools-Router unter der Basisroute "/docs"
router.use("/tools", tools);
router.use("/docs", docs);
router.use("/websites", websites);

export default router;
