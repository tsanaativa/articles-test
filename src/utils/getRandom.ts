export function getRandomNumber(min: number = 0, max: number = 1): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomItems<T>(arr: T[], maxItems: number = 3): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = getRandomNumber(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(maxItems, arr.length));
}
