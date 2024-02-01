"use server";

import { getExchangedCurrency } from '@/services/exchange';

export async function exchangeCurrency(prevState: {
    result: string  },
  formData: FormData,
) {

    const amount = formData.get('amount');
    const fromCurrency = formData.get('fromCurrency');
    const toCurrency = formData.get('toCurrency');

    try {
        const exchangeResult = await getExchangedCurrency(amount, fromCurrency, toCurrency);

        return { result: `${amount} ${fromCurrency} EQUALS ${exchangeResult} ${toCurrency}` };
    } catch (e) {
        return { result: "Oooops! Failed to Calculate exchnge rate" };
    }

}