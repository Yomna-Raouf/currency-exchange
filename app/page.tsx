import Image from 'next/image';

import { getQuotes } from '@/services/quotes';

import styles from '@/styles/home.module.css';
import CurrencyExchange from '@/components/currencyExchange/currencyExchange';

export default async function Home() {
  const quotes = await getQuotes();

  return (
    <main style={{ position: 'relative' }} >
      <Image src="/static/background.jpg" fill alt="currencies" className={styles.backgroundImage}  />

      <section className={styles.currencyExchange}>
        <div className={styles.container}>
          <h1 className={styles.heading}> Money Exchange </h1>
            <CurrencyExchange quotes={quotes} />          
        </div>
      </section>
    </main>
  );
}
