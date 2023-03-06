const CurrencyFormat = (number: number) => {
  const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
    currency: 'USD',
    style: 'currency',
  });
  return CURRENCY_FORMAT.format(number);
};

export default CurrencyFormat;
