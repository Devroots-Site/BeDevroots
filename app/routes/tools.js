import express from 'express';
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();
const prisma = new PrismaClient()

// Tools-Endpunkt
router.get('/', (req, res) => {
    res.json({ message: 'Docs endpoint is working!' });
});


router.get("/all", async (req, res) => {
    await prisma.$connect();
    await prisma.tools.findMany()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ error: error });
        }).finally(() => {
            prisma.$disconnect();
        });
});

export default router;
