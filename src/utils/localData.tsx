import { LangType } from '@/config/i18n/settings';
import { promises as fs } from 'fs';
import path from 'path';

export async function getLocalData(lang: LangType) {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), `src/locales/${lang}/site.json`);
  // Read the json file
  const jsonData = await fs.readFile(filePath);
  // Parse data as json
  const objectData = JSON.parse(jsonData as any);

  return objectData;
}
