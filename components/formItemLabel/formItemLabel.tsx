import styles from './formItemLabel.module.css';

const FormItemLabel = ({ label }: { label: string }) => {
  return <span className={styles.formLabel}>{label}</span>;
};

export default FormItemLabel;
