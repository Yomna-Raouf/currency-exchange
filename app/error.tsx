'use client';

import styles from '@/styles/home.module.css';

export default function Error() {
  return (
    <main className={styles.currencyExchange} >
        <div>
            <h1 className={styles.heading}>Oooops! Something went wrong</h1>
        </div>
    </main>
  );
}