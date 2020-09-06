import { createConnections } from 'typeorm';
import loadFixtures from './seed';

createConnections().then(connection => {
  loadFixtures('WeekDaySeed', connection[0]);
  loadFixtures('SubjectsSeed', connection[0]);
});
