'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import SwapOutlined from '@ant-design/icons/SwapOutlined';
import debounce from 'lodash.debounce';

import { getFormData } from '@/utils/getFormData';
import { amountFieldValidations } from '@/utils/formValidations';

import { currencyFieldCustomizationStyle } from '@/lib/currencyFieldCustomizationStyle';

import type { FormFields, FormatedQuote } from '@/types';

import { exchangeCurrency } from '@/app/actions';

import CurrencySelect from '../currencySelect/currencySelect';
import FormItemLabel from '../formItemLabel/formItemLabel';
import CustomButton from '../customButton/customButton';

import styles from './currencyExchange.module.css';

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

  const resetForm = () => {
    form.resetFields();
    setResult('');
    setFromCurrency('');
    setToCurrency('');
  };

  useEffect(() => {
    setResult(state?.result);
  }, [state]);

  return (
    <div className={styles.formWrapper}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ amount: '1.0' }}
        onValuesChange={onValuesChange}
      >
        <Form.Item<number>
          label={<FormItemLabel label="Amount" />}
          name="amount"
          style={currencyFieldCustomizationStyle}
          rules={amountFieldValidations}
        >
          <Input
            type="number"
            size="large"
            placeholder="0.0"
            step={0.1}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item<string> noStyle dependencies={['toCurrency']}>
          {() => (
            <CurrencySelect
              formItemLabel="From"
              name="fromCurrency"
              placeholder="Currency"
              onChange={setFromCurrency}
              quotes={quotes}
              conversionCurrency={toCurrency}
            />
          )}
        </Form.Item>

        <div className={styles.swapButtonContainer}>
          <CustomButton
            className="swapButton"
            ghost
            shape="circle"
            icon={<SwapOutlined />}
            onClick={onSwapCurrencies}
          />
        </div>

        <Form.Item<string> noStyle dependencies={['fromCurrency']}>
          {() => (
            <CurrencySelect
              formItemLabel="To"
              name="toCurrency"
              placeholder="Currency"
              onChange={setToCurrency}
              quotes={quotes}
              conversionCurrency={fromCurrency}
            />
          )}
        </Form.Item>
      </Form>

      {showResetButton && (
        <CustomButton
          className="resetButton"
          onClick={resetForm}
          content="Reset"
        />
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
