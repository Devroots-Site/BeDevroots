import express from "express";
import cors from "cors";
import { corsOptions } from "./app/middlewares/corsOptions.js"; // Deine eigene Konfiguration
import routes from "./app/routes/index.js";

const app = express();

// CORS für alle Routen aktivieren
app.use(cors(corsOptions)); // Fügt die CORS-Header hinzu

// JSON-Parser aktivieren
app.use(express.json());

// Routes hinzufügen
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
