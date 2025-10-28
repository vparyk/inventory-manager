export function timeAgo(thenISO: string): string {
  const thenMs: number = new Date(thenISO).getTime();
  const nowMs: number = Date.now();

  const differenceSec = Math.floor((nowMs - thenMs) / 1000);
  if (differenceSec < 60) {
    return "épp most";
  }
  const differenceMin = Math.floor(differenceSec / 60);
  if (differenceMin < 60) {
    return `${differenceMin} perce`;
  }

  const differenceHour = Math.floor(differenceMin / 60);
  if (differenceHour < 24) {
    return `${differenceHour} órája`;
  }

  const differenceDay = Math.floor(differenceHour / 24);
  return `${differenceDay} napja`;
}
