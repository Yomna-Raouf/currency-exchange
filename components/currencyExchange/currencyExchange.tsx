"use client";

import { useState } from 'react';
import { useFormState } from 'react-dom';

import { Input, Button, Select, Form } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';

import { getFormData } from '@/utils/getFormData';

import type { FormatedQuote } from '@/types';

import { exchangeCurrency } from '@/app/actions';

import styles from './currencyExchange.module.css';


const initialState = {
  result: '',
};

const CurrencyExchange = ({ quotes }: { quotes: FormatedQuote[] }) => {

    const [state, formAction] = useFormState(exchangeCurrency, initialState);

    const [form] = Form.useForm();

    const [showResetButton, setShowResetButton] = useState<boolean>(false);

    const onValuesChange = async (_: any , allValues: {amount: string, fromCurrency: string, toCurrency: string}) => {
        const getExchangedAmount = debounce(
            () => {
                const formData: FormData = getFormData(allValues);
                formAction(formData); 
            },
            2000
        );

        setTimeout(() => {
            form
            .validateFields()
            .then(() => {
                setShowResetButton(true);
                getExchangedAmount();
            })
        });
    }

  return (
    <div className={styles.formWrapper} >
        <Form form={form} layout='vertical' initialValues={{ amount: '1.0' }}  onValuesChange={onValuesChange}>
            <Form.Item<string>
                label={<span className={styles.formLabel}>Amount</span>}
                name='amount'
                id="amount"
                style={{ width: 300, height: 100, marginTop: 9, marginBottom: 0 }}
                rules={[
                    { 
                        required: true,
                        type: 'number',
                        min: 0,
                        message: "Please enter a positive number",
                        transform(value) {
                            return Number(value)
                    }}
                ]}
            >
                <Input
                    type='number'
                    size="large"
                    placeholder="0.0"                    
                    min="0"
                    step="0.1"
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item<string>
                label={<span className={styles.formLabel}>From</span>}
                name='fromCurrency'
                id="fromCurrency"
                style={{ width: 300, height: 100, marginTop: 9, marginBottom: 0 }}
                rules={[{ required: true, message: 'Please select a currency' }]}
            >
                <Select
                    size="large"
                    placeholder="Currency"
                    style={{ width: '100%' }}
                    options={quotes}
                ></Select>
            </Form.Item>


            <div className={styles.swapButton}>
                <Button size="large" ghost type="default" shape="circle" icon={<SwapOutlined />} />
            </div>

            <Form.Item<string>
                label={<span className={styles.formLabel}>To</span>}
                name='toCurrency'
                id="toCurrency"
                style={{ width: 300, height: 100, marginTop: 9, marginBottom: 0 }}
                rules={[{ required: true, message: 'Please select a currency' }]}
            >
                <Select
                    size="large"
                    placeholder="Currency"
                    style={{ width: '100%' }}
                    options={quotes}
                ></Select>
            </Form.Item>
        </Form>

        {showResetButton &&
            <div className={styles.resetButton}>
                <Button onClick={() => {form.resetFields();}} type="default" size="large">
                    <span>Reset</span>
                </Button>
            </div>
        }
        
        { state && <p aria-live="polite" role="result" className={styles.result}> {state?.result} </p> }
    </div>
  )
}

export default CurrencyExchange;