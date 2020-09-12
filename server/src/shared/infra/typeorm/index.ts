import { createConnections } from 'typeorm';
import loadFixtures from './seed';

createConnections().then(connection => {
  loadFixtures('SubjectsSeed', connection[0]);
  loadFixtures('WeekDaySeed', connection[0]);
});
