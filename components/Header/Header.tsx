import React, { Dispatch, SetStateAction } from 'react';
import { Category } from '@utils/posts';
import Button from '@components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  categories?: Category[];
  currentCategory?: number;
  searchQuery?: string;
  setCategory?: Dispatch<SetStateAction<number>>;
  setSearchQuery?: Dispatch<SetStateAction<string>>;
  setPage?: Dispatch<SetStateAction<number>>;
}

const Header = ({ categories, setCategory, currentCategory, searchQuery, setSearchQuery, setPage }: Props) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!setSearchQuery) return;
    setSearchQuery(e.target.value);
  };

  const handleNavCategoryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!setCategory || !setPage) return;
    const target = e.target as HTMLButtonElement;
    setPage(1);
    setCategory(parseInt(target.value));
  };

  const handleSelectCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!setCategory || !setPage) return;
    const target = e.target as HTMLSelectElement;
    setPage(1);
    setCategory(parseInt(target.value));
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 ">
      <Link href="/" className="flex items-center gap-2">
        <Image alt="Blog logo" src="/logo_blog.jpg" width={160} height={80} />
      </Link>
      {setSearchQuery && (
        <div>
          <input
            type="text"
            id="search"
            className="block w-full rounded-lg border border-gray-100  bg-gray-100 p-2.5 text-sm text-indigo-500 placeholder-gray-500 outline-none focus:border-indigo-500"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title"
          />
        </div>
      )}
      {categories && (
        <div className="hidden items-center justify-around gap-1 text-indigo-500 lg:flex">
          <Button key={0} onClick={handleNavCategoryChange} value={0} active={currentCategory === 0}>
            All
          </Button>
          {categories.map(({ id, name }) => (
            <Button key={id} onClick={handleNavCategoryChange} value={id} active={currentCategory === id}>
              {name}
            </Button>
          ))}
        </div>
      )}
      {categories && (
        <div className="lg:hidden">
          <select
            id="countries"
            value={currentCategory}
            onChange={handleSelectCategoryChange}
            className="block w-full rounded-lg border border-gray-100  bg-gray-100 p-2.5 text-sm text-indigo-500 placeholder-gray-500 outline-none focus:border-indigo-500"
          >
            <option value={0}>All</option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Header;
