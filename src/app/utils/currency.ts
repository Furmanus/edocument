const locale = 'pl-PL';
const options = {
  style: 'currency',
  currency: 'PLN',
};
const formatter = new Intl.NumberFormat(locale, options);

export function formatCurrency(value: number): string {
  return formatter.format(value);
}
