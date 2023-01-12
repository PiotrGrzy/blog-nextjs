import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import { getAllPosts, getCategories, Post } from '@utils/data';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const getStaticProps = async () => {
  const categories = await getCategories();
  const posts = await getAllPosts();
  return {
    props: { categories, posts },
  };
};

interface Props {
  categories: string[];
  posts: Post[];
}

export default function Home({ categories, posts }: Props) {
  console.log(categories);

  return (
    <>
      <h1>LIST OF POSTS</h1>
      <ul>
        {/* {posts.map((post) => {
          <li>
            <Link href={post.id}>{post.title}</Link>
          </li>;
        })} */}
      </ul>
    </>
  );
}
