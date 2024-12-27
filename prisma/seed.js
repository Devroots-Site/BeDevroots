import { PrismaClient } from '@prisma/client'
import { toolsData } from './testData/tools.js'
import { docsData } from './testData/docs.js'
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient()
console.log('DATABASE_URL:', process.env.DATABASE_URL);

async function main() {
    try {
        const findDocs = await prisma.docs.findMany()
        if (findDocs.length > 0) {
            await prisma.docs.deleteMany()
        }

        const findTools = await prisma.tools.findMany()
        if (findTools.length > 0) {
            await prisma.tools.deleteMany()
        }

        await prisma.docs.createMany({
            data: docsData
        })

        await prisma.tools.createMany({
            data: toolsData
        })

        console.log('Daten erfolgreich aktualisiert.')
    } catch (e) {
        console.error('Fehler beim Aktualisieren der Daten:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()