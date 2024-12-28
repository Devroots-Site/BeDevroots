import express from "express";
import cors from "cors";
import { corsOptions } from "./app/middlewares/corsOptions.js";
import routes from "./app/routes/index.js";

const app = express();

app.options('*', cors(corsOptions));
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
