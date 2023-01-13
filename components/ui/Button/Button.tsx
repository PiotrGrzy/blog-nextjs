import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Button = ({ children, ...otherProps }: Props) => {
  return (
    <button className="block rounded-lg py-2 px-4 text-indigo-500 transition hover:bg-indigo-100" {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
