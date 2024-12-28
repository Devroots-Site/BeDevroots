const corsOptions = {
    origin: '*', // Erlaubt alle Ursprünge
    optionsSuccessStatus: 200, // Für ältere Browser
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Erlaubte Methoden
    allowedHeaders: ['Content-Type', 'Authorization'], // Erlaubte Header
};

export { corsOptions };
