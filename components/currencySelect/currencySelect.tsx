'use client';

import Select from 'antd/lib/select';
import Form from 'antd/lib/form';

import type { FormatedQuote } from '@/types';

import { currencyFieldValidations } from '@/utils/formValidations';

import { currencyFieldCustomizationStyle } from '@/lib/currencyFieldCustomizationStyle';

import FormItemLabel from '../formItemLabel/formItemLabel';

type Props = {
  placeholder: string;
  quotes: FormatedQuote[];
  onChange: (value: string) => void;
  conversionCurrency: string;
  formItemLabel: string;
  name: string;
};

const CurrencySelect = ({
  quotes,
  placeholder,
  onChange,
  conversionCurrency,
  formItemLabel,
  name,
}: Props) => {
  return (
    <Form.Item<string>
      label={<FormItemLabel label={formItemLabel} />}
      name={name}
      style={currencyFieldCustomizationStyle}
      rules={currencyFieldValidations}
    >
      <Select
        size="large"
        placeholder={placeholder}
        style={{ width: '100%' }}
        onChange={(value) => {
          onChange(value);
        }}
      >
        {quotes.map(({ label, value }) => (
          <Select.Option
            disabled={conversionCurrency === value}
            value={value}
            key={label}
          >
            {label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CurrencySelect;
