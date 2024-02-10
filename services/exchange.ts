export const getExchangedCurrency = async (
  amount: FormDataEntryValue | null,
  fromCurrency: FormDataEntryValue | null,
  toCurrency: FormDataEntryValue | null,
): Promise<string> => {
  const res = await fetch(
    `https://${process.env.API_HOST}/exchange?from=${fromCurrency}&to=${toCurrency}&q=${amount}`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.API_KEY}`,
        'X-RapidAPI-Host': `${process.env.API_HOST}`,
      },
    },
  );

  const exchangeResult: string = await res.json();

  return exchangeResult;
};
