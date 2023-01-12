import path from 'path';
import { promises as fs } from 'fs';

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[];
};

const getDataFromJson = async (): Promise<{ posts: Post[]; categories: string[] }> => {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/blog.json', 'utf8');
  return JSON.parse(fileContents);
};

export const getCategories = async () => {
  const data = await getDataFromJson();
  return data.categories;
};

export const getAllPosts = async () => {
  const data = await getDataFromJson();
  return data.posts;
};

export const getPostData = async (id: string) => {
  const data = await getDataFromJson();

  return data.posts.find((post) => post.id === parseInt(id, 10));
};

type PostsQueryObject = {
  title: string;
  category: number;
  page: number;
};

const searchPostByTitle = (posts: Post[], query: string) => {
  return posts.filter((post) => post.title.includes(query));
};

const filterPostsByCategory = (posts: Post[], category: number) => {
  return posts.filter((post) => post.categories.includes(category));
};
