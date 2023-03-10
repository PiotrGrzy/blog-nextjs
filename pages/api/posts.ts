import { getPosts, Post, PostsQueryObject } from '@utils/posts';
import type { NextApiRequest, NextApiResponse } from 'next';

export type Posts = {
  posts: Post[];
  pagesTotal: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Posts>) {
  const { search, page, category } = req.query;

  const query = {
    search: search,
    page: parseInt(page as string, 10),
    category: parseInt(category as string, 10),
  } as PostsQueryObject;

  const posts = await getPosts({ query });
  res.status(200).json(posts);
}
