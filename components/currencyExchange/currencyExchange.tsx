'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import SwapOutlined from '@ant-design/icons/SwapOutlined';
import debounce from 'lodash.debounce';

import { getFormData } from '@/utils/getFormData';

import type { FormFields, FormatedQuote } from '@/types';

import { exchangeCurrency } from '@/app/actions';

import styles from './currencyExchange.module.css';
import CurrencySelect from '../currencySelect/currencySelect';

const initialState = {
  result: '',
};

const CurrencyExchange = ({ quotes }: { quotes: FormatedQuote[] }) => {
  const [form] = Form.useForm();
  const [state, formAction] = useFormState(exchangeCurrency, initialState);

  const [toCurrency, setToCurrency] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('');

  const [result, setResult] = useState<string>(state.result);
  const [showResetButton, setShowResetButton] = useState<boolean>(false);

  const debounceExchangedAmount = debounce(() => {
    form
      .validateFields()
      .then((values: FormFields): void => {
        setResult('');
        setShowResetButton(true);
        const formData: FormData = getFormData(values);
        formAction(formData);
      })
      .catch(() => {
        setResult('');
      });
  }, 2000);

  const onValuesChange = async () => {
    debounceExchangedAmount();
  };

  useEffect(() => {
    setResult(state?.result);
  }, [state]);

  const onSwapCurrencies = async () => {
    const fromCurrencyFieldVal = form.getFieldValue('fromCurrency');
    const toCurrencyFieldVal = form.getFieldValue('toCurrency');
    const temp = fromCurrencyFieldVal;

    form.setFieldsValue({ fromCurrency: toCurrencyFieldVal });
    form.setFieldsValue({ toCurrency: temp });

    setToCurrency(temp);
    setFromCurrency(toCurrencyFieldVal);

    onValuesChange();
  };

  return (
    <div className={styles.formWrapper}>
      <Form form={form} layout="vertical" initialValues={{ amount: '1.0' }} onValuesChange={onValuesChange}>
        <Form.Item<string>
          label={<span className={styles.formLabel}>Amount</span>}
          name="amount"
          id="amount"
          style={{ width: 300, height: 100, marginTop: 9, marginBottom: 0 }}
          rules={[
            {
              required: true,
              type: 'number',
              min: 1,
              message: 'Please enter a positive number',
              transform: (value) => {
                return Number(value);
              },
            },
          ]}
        >
          <Input type="number" size="large" placeholder="0.0" step={0.1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item<string>
          label={<span className={styles.formLabel}>From</span>}
          name="fromCurrency"
          id="fromCurrency"
          style={{ width: 300, height: 100, marginTop: 9, marginBottom: 0 }}
          rules={[{ required: true, message: 'Please select a currency' }]}
        >
          <CurrencySelect
            placeholder="Currency"
            onChange={setFromCurrency}
            quotes={quotes}
            conversionCurrency={toCurrency}
          />
        </Form.Item>

        <div className={styles.swapButton}>
          <Button size="large" ghost type="default" shape="circle" icon={<SwapOutlined />} onClick={onSwapCurrencies} />
        </div>

        <Form.Item<string>
          label={<span className={styles.formLabel}>To</span>}
          name="toCurrency"
          id="toCurrency"
          style={{ width: 300, height: 100, marginTop: 9, marginBottom: 0 }}
          rules={[{ required: true, message: 'Please select a currency' }]}
        >
          <CurrencySelect
            placeholder="Currency"
            onChange={setToCurrency}
            quotes={quotes}
            conversionCurrency={fromCurrency}
          />
        </Form.Item>
      </Form>

      {showResetButton && (
        <div className={styles.resetButton}>
          <Button
            onClick={() => {
              form.resetFields();
              setResult('');
            }}
            type="default"
            size="large"
          >
            <span>Reset</span>
          </Button>
        </div>
      )}

      {result && (
        <p aria-live="polite" role="result" className={styles.result}>
          {result}
        </p>
      )}
    </div>
  );
};

export default CurrencyExchange;
