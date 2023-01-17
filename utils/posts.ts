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

export type PostsQueryObject = {
  search: string;
  category: number;
  page: number;
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

export const getAllPosts = async () => {
  const data = await getDataFromJson();
  return { posts: data.posts };
};

export const getSinglePostData = async (slug: string) => {
  const data = await getDataFromJson();
  return data.posts.find((post) => post.slug === slug);
};

export const getPosts = async ({ query }: { query: PostsQueryObject }) => {
  const data = await getDataFromJson();
  const { search, category, page } = query;
  let posts = data.posts;

  if (search) {
    posts = searchPostByTitle(posts, search);
  }

  if (category) {
    posts = filterPostsByCategory(posts, category);
  }

  const totalCount = posts.length;
  const pagesTotal = totalCount < PAGE_SIZE ? 1 : Math.ceil(totalCount / PAGE_SIZE);

  posts = posts.slice((page - 1) * 3, page * 3);

  return { posts, pagesTotal };
};

const searchPostByTitle = (posts: Post[], query: string) => {
  return posts.filter((post) => post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
};

const filterPostsByCategory = (posts: Post[], category: number) => {
  return posts.filter((post) => post.categories.includes(category));
};
