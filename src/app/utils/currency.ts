const locale = 'pl-PL';
const options = {
  style: 'currency',
  currency: 'PLN',
};
const localeToInputAdornmentText = {
  'pl-PL': 'zł',
};
const formatter = new Intl.NumberFormat(locale, options);

export function formatCurrency(value: number): string {
  return formatter.format(value);
}

export function getCurrencyInputAdornment(): string {
  return localeToInputAdornmentText[locale];
}
