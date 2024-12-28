import express from 'express';
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv';


const router = express.Router();
dotenv.config();
const prisma = new PrismaClient()

router.get('/', (req, res) => {
    res.json({ message: 'Websites endpoint is working!' });
}

);


router.get("/all", async (req, res) => {
    prisma.$connect();
    prisma.websites.findMany({
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

router.get("/categories/all", async (req, res) => {
    try {
        const data = await prisma.websites.findMany({
            select: {
                keywords: true, // Select only the `keywords` field
            },
        });

        // Flatten and extract unique keywords
        const allKeywords = data
            .flatMap((website) => website.keywords || []) // Flatten keywords and exclude null
            .filter((keyword, index, self) => self.indexOf(keyword) === index); // Get unique keywords

        res.json({ keywords: allKeywords });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
);


export default router;