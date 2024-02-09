'use client';

import Select from 'antd/lib/select';

import type { FormatedQuote } from '@/types';

type Props = {
  placeholder: string;
  quotes: FormatedQuote[];
  onChange: (value: string) => void;
  conversionCurrency: string;
};

const CurrencySelect = ({ quotes, placeholder, onChange, conversionCurrency }: Props) => {
  return (
    <Select
      size="large"
      placeholder={placeholder}
      style={{ width: '100%' }}
      onChange={(value) => {
        onChange(value);
      }}
    >
      {quotes.map(({ label, value }) => (
        <Select.Option disabled={conversionCurrency === value} value={value} key={label}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CurrencySelect;
