import type { Rule } from 'antd/es/form';

export const amountFieldValidations: Rule[] = [
  {
    required: true,
    type: 'number',
    min: 1,
    message: 'Please enter a positive number',
    transform: (value: string) => {
      return Number(value);
    },
  },
];

export const currencyFieldValidations: Rule[] = [
  { required: true, message: 'Please select a currency' },
];
