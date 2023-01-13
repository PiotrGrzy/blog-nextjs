import { Inter } from '@next/font/google';
import PostCard from '@components/PostCard';
import { Category, getAllPosts, getCategories, Post } from '@utils/data';
import { NextPage } from 'next';
import Link from 'next/link';
import Heading from '@components/ui/Heading';
import ArrowLeft from '@components/Icons/ArrowLeft';
import ArrowRight from '@components/Icons/ArrowRight';
import Button from '@components/ui/Button';
import Header from '@components/Header';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const getStaticProps = async () => {
  const categories = await getCategories();
  const posts = await getAllPosts();
  return {
    props: { categories, posts },
  };
};

interface Props {
  categories: Category[];
  posts: Post[];
}

const Home: NextPage<Props> = ({ categories, posts }) => {
  console.log(categories);
  const [currentCategory, setCurrentCategory] = useState<null | number>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
      <h2 className="mb-8 text-center text-lg text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos necessitatibus facilis fugit modi earum. Ipsam
        obcaecati inventore libero asperiores voluptates!
      </h2>
      <div className="flex min-h-max flex-col justify-evenly gap-6 md:gap-10 lg:flex-row">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} categories={categories} />;
        })}
      </div>
      <div className="m-3 mt-8 flex justify-between">
        <Button>
          <div className="flex gap-2 transition hover:-translate-x-2 ">
            <ArrowLeft />
            LastPage
          </div>
        </Button>
        <Button>
          <div className="flex gap-2 transition hover:translate-x-2">
            NextPage
            <ArrowRight />
          </div>
        </Button>
      </div>
    </>
  );
};

export default Home;
