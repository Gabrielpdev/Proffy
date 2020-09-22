export default function convertMinutesToHour(time: number): string {
  const timeInHour = String(time / 60);

  const [hour] = timeInHour.split('.');

  if (Number(hour) < 10) {
    return `0${hour}`;
  }

  return hour;
}
