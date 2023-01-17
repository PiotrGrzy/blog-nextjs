import { useState } from 'react';
import { NextPage } from 'next';
import useSWR, { SWRConfig } from 'swr';

import { Category, getAllPosts, getCategories, Post } from '@utils/posts';
import PostCard from '@components/PostCard';
import Heading from '@components/ui/Heading';
import ArrowLeftIcon from '@components/Icons/ArrowLeftIcon';
import ArrowRightIcon from '@components/Icons/ArrowRightIcon';
import Button from '@components/ui/Button';
import Header from '@components/Header';
import { Posts } from './api/posts';

export const getStaticProps = async () => {
  const categories = await getCategories();
  const posts = await getAllPosts();
  return {
    props: {
      fallback: {
        'api/posts/?page=1&category=null&search=': posts,
      },
      categories: categories,
    },
  };
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface PageProps {
  categories: Category[];
}

const Home: NextPage<PageProps> = ({ categories }) => {
  const [currentCategory, setCurrentCategory] = useState<null | number>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useSWR<Posts>(
    `api/posts/?page=${page}&category=${currentCategory}&search=${searchQuery}`,
    fetcher,
  );

  const goToPrevPage = () => {
    setPage((prevState) => --prevState);
  };

  const goToNextPage = () => {
    setPage((prevState) => ++prevState);
  };

  return (
    <>
      <Header
        categories={categories}
        setCategory={setCurrentCategory}
        currentCategory={currentCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Heading>From the Blog</Heading>
      <h2 className="mb-24 mt-5 text-center text-lg text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos necessitatibus facilis fugit modi earum. Ipsam
        obcaecati inventore libero asperiores voluptates!
      </h2>
      {error ? (
        <div className="py-5 text-center font-medium">Oops! Something went wrong.</div>
      ) : (
        <>
          <div className="flex min-h-max flex-col justify-evenly gap-6 md:gap-10 lg:flex-row">
            {data?.posts.map((post) => {
              return <PostCard key={post.id} post={post} categories={categories} />;
            })}
          </div>
          <div className="m-3 mt-16 flex justify-between px-4">
            <Button disabled={page === 1} onClick={goToPrevPage}>
              <div className={`flex gap-2 transition ${page !== 1 ? 'hover:translate-x-2' : ''}`}>
                <ArrowLeftIcon />
                Previous Page
              </div>
            </Button>
            <Button disabled={page === data?.pagesTotal} onClick={goToNextPage}>
              <div className={`flex gap-2 transition ${page !== data?.pagesTotal ? 'hover:translate-x-2' : ''}`}>
                Next Page
                <ArrowRightIcon />
              </div>
            </Button>
          </div>
        </>
      )}
    </>
  );
};

interface Props {
  fallback: {
    data: Post[];
    pagesTotal: number;
  };
  categories: Category[];
}

export default function Page({ fallback, categories }: Props) {
  return (
    <SWRConfig value={{ fallback }}>
      <Home categories={categories} />
    </SWRConfig>
  );
}
