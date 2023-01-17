import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Heading = ({ children }: Props) => {
  return <h1 className="mb-10 mt-14 text-center text-4xl font-bold lg:mt-36">{children}</h1>;
};

export default Heading;
