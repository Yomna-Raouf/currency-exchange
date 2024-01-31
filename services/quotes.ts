type Quotes = string[];
type FormatedQuotes = { label: string; value: string }[];

export const getQuotes = async (): Promise<FormatedQuotes> => {
  const res = await fetch(`https://${process.env.API_HOST}/listquotes`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${process.env.API_KEY}`,
      'X-RapidAPI-Host': `${process.env.API_HOST}`,
    },
    cache: 'no-store',
  });

  const quotes: Quotes = await res.json();

  const formttedQuotes = quotes.map((quote) => ({
    value: quote,
    label: quote,
  }));

  return formttedQuotes;
};
