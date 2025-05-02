const corsOptions = {
  origin: '*', 
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions;
