import styles from '@/styles/home.module.css';

export default function Loading() {
  return (
    <main>
      <div className={styles.currencyExchange}>
        <p className={styles.heading}>Loading...</p>
      </div>
    </main>
  );
}