/* eslint-disable no-undef */
import { seedDocumenation } from './documentation.seed';
import { seedWebsite } from './website.seed';
import { docsData } from './data/documentation.data';
import { websitesData } from './data/website.data';
import { seedTools } from './tools.seed';
import { toolData } from './data/tools.data';

async function runSeeding() {
  console.log('🟡 starting seeding ...\n');
  await timeoutSeeding();
  console.log('📄 creating documentation ...');
  await seedDocumenation(docsData as []);
  await timeoutSeeding();
  console.log(`✅ Documentation completed (${docsData.length} entries)`);
  await timeoutSeeding();
  console.log('🌐 Inserting websites...');
  await timeoutSeeding();
  await seedWebsite(websitesData as []);
  await timeoutSeeding();
  console.log(`✅ Websites completed (${websitesData.length} entries)`);
  await timeoutSeeding();

  console.log('🛠️ Inserting tools...');
  await seedTools(toolData as []);
  await timeoutSeeding();
  console.log(`✅ Tools completed (${toolData.length} entries)`);
  await timeoutSeeding();
  console.log('\n🎉 Seeding completed!');
}

runSeeding().catch((e) => {
  console.error('❌ Error during seeding:', e);
  process.exit(1);
});

async function timeoutSeeding() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
}
