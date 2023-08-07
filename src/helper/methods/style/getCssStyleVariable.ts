export function getCssStyleVariable(property: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(property);
}
