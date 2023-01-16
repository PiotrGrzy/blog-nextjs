import React, { Dispatch, SetStateAction } from 'react';
import { Category } from '@utils/posts';
import Button from '@components/ui/Button';
import Image from 'next/image';

interface Props {
  categories?: Category[];
  currentCategory?: null | number;
  searchQuery?: string;
  setCategory?: Dispatch<SetStateAction<number | null>>;
  setSearchQuery?: Dispatch<SetStateAction<string>>;
}

const Header = ({ categories, setCategory, currentCategory, searchQuery, setSearchQuery }: Props) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!setSearchQuery) return;
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!setCategory) return;
    const target = e.target as HTMLButtonElement;
    setCategory(parseInt(target.value));
  };

  const clearCategory = () => {
    if (!setCategory) return;
    setCategory(null);
  };

  return (
    <div className="flex justify-between gap-4 ">
      <div>
        <Image alt="Blog logo" src="/logo_blog.jpg" width={160} height={80} />
      </div>
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      {categories && (
        <div className="hidden items-center justify-around gap-1 text-indigo-500 lg:flex">
          <Button key={null} onClick={clearCategory} active={currentCategory === null}>
            All
          </Button>
          {categories.map(({ id, name }) => (
            <Button key={id} onClick={handleCategoryChange} value={id} active={id === currentCategory}>
              {name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
