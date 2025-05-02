import { seedPrima as prisma } from '../utils/Prisma';
export async function seedDocumenation(seedingData: []) {
  const data = await findDocumenation();

  if (data.length > 0) {
    await deleteDocumentation();
  }

  await prisma.documentation.createMany({
    data: seedingData,
  });
}

async function deleteDocumentation() {
  await prisma.documentation.deleteMany();
}

async function findDocumenation() {
  const data = await prisma.documentation.findMany();
  return data;
}
