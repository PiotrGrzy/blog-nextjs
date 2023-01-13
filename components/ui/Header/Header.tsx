import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Header = ({ children }: Props) => {
  return <h1 className="text-4xl font-bold text-center my-10">{children}</h1>;
};

export default Header;
