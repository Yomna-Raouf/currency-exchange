import Image from 'next/image';

import { InputNumber, Flex, Button, Select } from 'antd';
import { SwapOutlined } from '@ant-design/icons';

import styles from '@/styles/currencyExchange.module.css';

export default function Home() {
  return (
    <main>
      <Image src="/static/background.jpg" fill alt="currencies" className={styles.backgroundImage} />

      <section className={styles.currencyExchange}>
        <div className={styles.container}>
          <h1 className={styles.heading}> Money Exchange </h1>

          <Flex justify="space-between" align="end" wrap="wrap" className={styles.formWrapper}>
            <Flex vertical>
              <label className={styles.formLabel} htmlFor="amount">
                Amount
              </label>
              <InputNumber<string>
                size="large"
                id="amount"
                style={{ width: 250, marginTop: 9 }}
                placeholder="0.0"
                defaultValue="1"
                min="0"
                step="0.1"
                stringMode
              />
            </Flex>

            <Flex vertical>
              <label className={styles.formLabel} htmlFor="fromCurrency">
                From
              </label>
              <Select
                size="large"
                id="fromCurrency"
                defaultValue="lucy"
                style={{ width: 250, marginTop: 9 }}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Flex>

            <div className={styles.swapButton}>
              <Button size="large" ghost type="default" shape="circle" icon={<SwapOutlined />} />
            </div>

            <Flex vertical>
              <label className={styles.formLabel} htmlFor="toCurrency">
                To
              </label>
              <Select
                size="large"
                id="toCurrency"
                defaultValue="lucy"
                style={{ width: 250, marginTop: 9 }}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Flex>
          </Flex>

          <div className={styles.resetButton}>
            <Button type="default" size="large">
              <span>Reset</span>
            </Button>
          </div>

          <p className={styles.result}> 1 Dollar equals 30.90 EGP </p>
        </div>
      </section>
    </main>
  );
}
