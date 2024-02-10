import { MouseEventHandler } from 'react';

import Button from 'antd/lib/button';

type Props = {
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
  ghost = false,
}: Props) => {
  return (
    <Button
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
