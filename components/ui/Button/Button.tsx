import { ReactNode } from 'react';

export interface Props
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {
  children: ReactNode;
  active?: boolean;
}

const Button = ({ children, active, ...otherProps }: Props) => {
  return (
    <button
      className={`block rounded-lg py-2 px-4 text-indigo-500 transition hover:bg-indigo-100 disabled:bg-gray-100 disabled:text-gray-400 ${
        active ? 'bg-indigo-100' : ''
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
