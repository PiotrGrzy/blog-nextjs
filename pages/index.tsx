import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR, { SWRConfig } from 'swr';

import { Category, getAllPosts, getCategories, getPosts, Post, PostsQueryObject } from '@utils/posts';
import { Posts } from './api/posts';
import useDebounce from 'hooks/useDebounce';
import PostCard from '@components/PostCard';
import Heading from '@components/ui/Heading';
import Header from '@components/Header';
import Loader from '@components/ui/Loader';
import Pagination from '@components/Pagination';

export const getStaticProps = async () => {
  const categories = await getCategories();
  const query = {
    search: '',
    page: 1,
    category: 0,
  } as PostsQueryObject;
  const posts = await getPosts({ query });
  return {
    props: {
      fallback: {
        'api/posts/?page=1&category=0&search=': posts,
      },
      categories: categories,
    },
  };
};

interface PageProps {
  categories: Category[];
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Home: NextPage<PageProps> = ({ categories }) => {
  const router = useRouter();
  const { isReady, query } = router;
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error } = useSWR<Posts>(
    `api/posts/?page=${currentPage}&category=${currentCategory}&search=${debouncedSearchQuery}`,
    fetcher,
  );

  const goToPrevPage = () => {
    setCurrentPage((prevState) => --prevState);
  };

  const goToNextPage = () => {
    setCurrentPage((prevState) => ++prevState);
  };

  useEffect(() => {
    if (!isReady) return;
    const { search, category, page } = query;
    const initialValues = {
      search: search ? (search as string) : '',
      category: category ? parseInt(category as string, 10) : 0,
      page: page ? parseInt(page as string, 10) : 1,
    };
    setCurrentCategory(initialValues.category);
    setCurrentPage(initialValues.page);
    setSearchQuery(initialValues.search);
  }, [isReady, query]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    const timeout = setTimeout(() => {
      router.push({
        pathname: '/',
        query: {
          page: currentPage,
          category: currentCategory,
          search: debouncedSearchQuery,
        },
      });
    }, 500);
    return function cleanUp() {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, currentCategory, currentPage, isReady]);

  return (
    <>
      <Header
        categories={categories}
        setCategory={setCurrentCategory}
        currentCategory={currentCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setCurrentPage}
      />
      <Heading>From the Blog</Heading>
      <h2 className="mb-24 mt-5 text-center text-lg text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos necessitatibus facilis fugit modi earum. Ipsam
        obcaecati inventore libero asperiores voluptates!
      </h2>
      {data?.posts.length === 0 && (
        <div className="py-5 text-center font-medium">We are sorry. We have no posts with current criteria.</div>
      )}
      {error ? (
        <div className="py-5 text-center font-medium">Oops! Something went wrong.</div>
      ) : (
        <>
          <div className="flex flex-col justify-evenly gap-6 md:gap-10 lg:h-[32rem] lg:flex-row">
            {data?.posts.map((post) => {
              return <PostCard key={post.id} post={post} categories={categories} />;
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            pagesTotal={data?.pagesTotal}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
          />
        </>
      )}
    </>
  );
};

interface Props {
  fallback: Posts;
  categories: Category[];
}

export default function Page({ fallback, categories }: Props) {
  return (
    <SWRConfig value={{ fallback }}>
      <Home categories={categories} />
    </SWRConfig>
  );
}
