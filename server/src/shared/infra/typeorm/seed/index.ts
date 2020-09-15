import { Connection } from 'typeorm';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export default async function loadFixtures(
  name: string,
  dbConnection: Connection,
): Promise<any> {
  let items: any[] = [];
  try {
    const file: any = yaml.safeLoad(
      fs.readFileSync(`./src/shared/infra/typeorm/seed/${name}.yml`, 'utf8'),
    );

    console.log(file);
    items = file.fixtures;
  } catch (e) {
    console.log('fixtures error', e);
  }

  if (!items) {
    return;
  }

  const hasValues = await dbConnection
    .createQueryBuilder()
    .select('*')
    .from('week_day', '*')
    .getOne();

  if (!hasValues) {
    items.forEach(async (item: any) => {
      const entityName = Object.keys(item)[0];
      const data = item[entityName];
      await dbConnection
        .createQueryBuilder()
        .insert()
        .into(entityName)
        .values(data)
        .execute();
    });
  }
}
