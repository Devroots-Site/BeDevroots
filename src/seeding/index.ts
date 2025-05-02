import { seedDocumenation } from './documentation.seed';
import { seedWebsite } from './website.seed';
import { docsData } from './data/documentation.data';
import { websitesData } from './data/website.data';
import { seedTools } from './tools.seed';
import { toolData } from './data/tools.data';

async function runSeeding() {
  console.log('🟡 Seeding gestartet...\n');
  await timeoutSeeding();
  console.log('📄 Dokumentation wird eingefügt...');
  await seedDocumenation(docsData as []);
  await timeoutSeeding();
  console.log(`✅ Dokumentation fertig (${docsData.length} Einträge)`);
  await timeoutSeeding();
  console.log('🌐 Websites werden eingefügt...');
  await timeoutSeeding();
  await seedWebsite(websitesData as []);
  await timeoutSeeding();
  console.log(`✅ Websites fertig (${websitesData.length} Einträge)`);
  await timeoutSeeding();

  console.log('🛠️ Tools werden eingefügt...');
  await seedTools(toolData as []);
  await timeoutSeeding();
  console.log(`✅ Tools fertig (${toolData.length} Einträge)`);
  await timeoutSeeding();
  console.log('\n🎉 Seeding abgeschlossen!');
}

runSeeding().catch((e) => {
  console.error('❌ Fehler beim Seeding:', e);
  process.exit(1);
});

async function timeoutSeeding() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
}
