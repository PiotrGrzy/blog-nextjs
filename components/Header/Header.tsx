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
    <div className="flex items-center justify-between gap-4 ">
      <div className="flex items-center gap-2">
        <Image alt="Blog logo" src="/logo_blog.jpg" width={160} height={80} />
      </div>
      {setSearchQuery && (
        <div>
          <input
            type="text"
            id="search"
            className="block w-full rounded-lg border-indigo-500 bg-gray-100 p-2.5 text-sm text-indigo-500 placeholder-gray-500 outline-none focus:border"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title"
          />
        </div>
      )}
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
