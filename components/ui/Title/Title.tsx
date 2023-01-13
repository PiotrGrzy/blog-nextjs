import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Title = ({ children }: Props) => {
  return <h3 className="p-3 font-semibold">{children}</h3>;
};

export default Title;
