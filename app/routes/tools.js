import express from 'express';

const router = express.Router();

// Tools-Endpunkt
router.get('/', (req, res) => {
    res.json({ message: 'Docs endpoint is working!' });
});

export default router;
