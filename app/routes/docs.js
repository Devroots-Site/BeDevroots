import express from 'express';
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv';
import e from 'express';

const router = express.Router();
dotenv.config();
const prisma = new PrismaClient()


router.get('/', (req, res) => {
    res.json({ message: 'Docs endpoint is working!' });
});

router.get("/all", async (req, res) => {
    prisma.$connect();
    prisma.docs.findMany({
        orderBy: {
            name: 'asc'
        }
    })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ error: error });
        }).finally(() => {
            prisma.$disconnect();
        });
}
);


export default router;