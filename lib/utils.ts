export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}
