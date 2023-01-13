import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const TextContent = ({ children }: Props) => {
  return <article className="p-3 text-slate-500">{children}</article>;
};

export default TextContent;
