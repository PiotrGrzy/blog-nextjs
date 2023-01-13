import React, { Dispatch, SetStateAction } from 'react';
import { Category } from '@utils/data';
import Button from '@components/ui/Button';
import Image from 'next/image';

interface Props {
  categories?: Category[];
  currentCategory?: null | number;
  searchQuery: string;
  setCategory?: Dispatch<SetStateAction<number | null>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const Header = ({ categories, setCategory, category, searchQuery, setSearchQuery }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="align flex justify-between gap-4">
      <div>
        <Image alt="Blog logo" src="/logo_blog.jpg" width={160} height={80} />
      </div>
      <input type="text" value={searchQuery} onChange={handleChange} />
      {categories && (
        <div className="hidden justify-around text-indigo-500 lg:flex ">
          <Button key={null} onClick={() => setCategory(null)}>
            All
          </Button>
          {categories.map(({ id, name }) => (
            <Button key={id} onClick={() => setCategory(id)}>
              {name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
