export interface FormatedQuote { 
  label: string; 
  value: string;
  disabled: boolean;
};

export type FormFields = {
  amount: string; 
  fromCurrency: string;
  toCurrency: string;
}