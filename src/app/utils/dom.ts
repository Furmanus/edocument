export function getScreenSize(): number {
  return document.documentElement.clientWidth;
}

export function isMobile(): boolean {
  return getScreenSize() < 480;
}
