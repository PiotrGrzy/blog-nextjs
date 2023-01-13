import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Button = ({ children, ...otherProps }: Props) => {
  return (
    <button className="py-2 px-4 color-white bg-purple-500" {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
