/**
 * Generates a realistic-looking active user count that varies smoothly
 * based on time of day (UTC) and adds small random noise per refresh.
 */
export function getActiveUsers(): number {
  const now = new Date();
  const hour = now.getUTCHours();

  const baseCurve: Record<number, number> = {
    0: 85, 1: 65, 2: 55, 3: 50, 4: 52, 5: 60,
    6: 80, 7: 110, 8: 145, 9: 175, 10: 200, 11: 220,
    12: 240, 13: 250, 14: 260, 15: 270, 16: 280, 17: 275,
    18: 260, 19: 240, 20: 210, 21: 180, 22: 140, 23: 110,
  };

  const base = baseCurve[hour] ?? 150;
  const minuteFactor = now.getMinutes() / 60;
  const nextHour = (hour + 1) % 24;
  const interpolated = base + (baseCurve[nextHour] - base) * minuteFactor;

  const dayOfWeek = now.getUTCDay();
  const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.75 : 1;

  const noise = Math.sin(now.getTime() / 30000) * 12 + Math.cos(now.getTime() / 17000) * 8;

  return Math.round(Math.max(50, Math.min(300, interpolated * weekendFactor + noise)));
}
