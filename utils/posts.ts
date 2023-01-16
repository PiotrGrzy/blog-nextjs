import path from 'path';
import { promises as fs } from 'fs';

const PAGE_SIZE = 3;

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[];
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

const getDataFromJson = async (): Promise<{ posts: Post[]; categories: Category[] }> => {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/blog.json', 'utf8');
  return JSON.parse(fileContents);
};

export const getCategories = async () => {
  const data = await getDataFromJson();
  return data.categories;
};

export type PostsQueryObject = {
  search: string;
  category: number | null;
  page: number;
};

export const getAllPosts = async () => {
  const data = await getDataFromJson();
  return { posts: data.posts };
};

export const getSinglePostData = async (id: string) => {
  const data = await getDataFromJson();
  return data.posts.find((post) => post.id === parseInt(id, 10));
};

export const getPosts = async ({ query }: { query: PostsQueryObject }) => {
  const data = await getDataFromJson();

  console.log('QUERY', query);

  let posts = data.posts;
  console.log('POSTS initial', posts.length);
  const { search, category, page } = query;

  if (search) {
    posts = searchPostByTitle(posts, search);
  }
  console.log('POSTS after search', posts.length);

  if (category) {
    posts = filterPostsByCategory(posts, category);
  }
  console.log('POSTS after category', posts.length);

  const totalCount = posts.length;
  const pagesTotal = totalCount < PAGE_SIZE ? 1 : Math.ceil(totalCount / PAGE_SIZE);

  posts = posts.slice((page - 1) * 3, page * 3);
  console.log('POSTS after page change', posts.length);

  return { posts, pagesTotal };
};
const searchPostByTitle = (posts: Post[], query: string) => {
  return posts.filter((post) => post.title.includes(query));
};

const filterPostsByCategory = (posts: Post[], category: number) => {
  return posts.filter((post) => post.categories.includes(category));
};
