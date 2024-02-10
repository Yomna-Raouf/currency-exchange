import type { FormatedQuote } from '@/types';

type Quotes = string[];

export const getQuotes = async (): Promise<FormatedQuote[]> => {
  const res = await fetch(`https://${process.env.API_HOST}/listquotes`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${process.env.API_KEY}`,
      'X-RapidAPI-Host': `${process.env.API_HOST}`,
    },
    cache: 'no-store',
  });

  const quotes: Quotes = await res.json();

  const formttedQuotes: FormatedQuote[] = quotes.map((quote) => ({
    value: quote,
    label: quote,
    disabled: false,
  }));

  return formttedQuotes;
};
