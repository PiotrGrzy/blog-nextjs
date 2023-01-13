import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Heading = ({ children }: Props) => {
  return <h1 className="my-10 text-center text-4xl font-bold">{children}</h1>;
};

export default Heading;
