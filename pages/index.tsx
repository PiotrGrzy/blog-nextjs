import { Inter } from '@next/font/google';
import PostCard from '@components/PostCard';
import { Category, getAllPosts, getCategories, Post } from '@utils/data';
import { NextPage } from 'next';
import Link from 'next/link';
import Header from '@components/ui/Header';

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

  return (
    <>
      <Header>From the Blog</Header>
      <h2 className="text-lg text-gray-500 text-center mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos necessitatibus facilis fugit modi earum. Ipsam
        obcaecati inventore libero asperiores voluptates!
      </h2>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-evenly">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} categories={categories} />;
        })}
      </div>
    </>
  );
};

export default Home;
