import { seedPrima as prisma } from '../utils/Prisma';

async function deleteTools() {
    await prisma.tools.deleteMany();
}

async function findTools() {
    return prisma.tools.findMany();
}
export async function seedTools(seedData: []) {
    const tools = await findTools();
    if (tools.length > 0) {
        await deleteTools();
    }

    await prisma.tools.createMany({
        data: seedData,
    });
}
