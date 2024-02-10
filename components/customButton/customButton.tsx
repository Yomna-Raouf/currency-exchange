import { MouseEventHandler } from 'react';

import Button from 'antd/lib/button';

import styles from './customButton.module.css';

type Props = {
  className: string;
  content?: string;
  icon?: JSX.Element;
  onClick?: MouseEventHandler<HTMLElement>;
  ghost?: boolean;
  shape?: 'circle' | 'default' | 'round' | undefined;
};

const CustomButton = ({
  icon,
  content,
  onClick,
  shape,
  className,
  ghost = false,
}: Props) => {
  return (
    <Button
      className={styles[className]}
      size="large"
      ghost={ghost}
      type="default"
      shape={shape}
      icon={icon}
      onClick={onClick}
    >
      {content && <span>{content}</span>}
    </Button>
  );
};

export default CustomButton;
