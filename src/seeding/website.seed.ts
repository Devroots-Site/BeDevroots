import { seedPrima as prisma } from '../utils/Prisma';

async function deleteWebsites() {
  await prisma.websites.deleteMany();
}

async function findWebsites() {
  return await prisma.websites.findMany();
}

export async function seedWebsite(seedData: []) {
  const websites = await findWebsites();
  if (websites.length > 0) {
    await deleteWebsites();
  }

  await prisma.websites.createMany({
    data: seedData,
  });
}
