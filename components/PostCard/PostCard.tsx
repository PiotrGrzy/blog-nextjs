import Link from 'next/link';
import TextContent from '@components/ui/TextContent';
import Title from '@components/ui/Title';
import { Category, Post } from '@utils/posts';
import PostInfo from '@components/PostInfo';

interface Props {
  post: Post;
  categories: Category[];
}

const PostCard = ({ post, categories }: Props) => {
  const { imageUrl, title, categories: categoryIds, excerpt, slug } = post;
  return (
    <Link className="block lg:w-1/3" href={slug}>
      <div className="flex h-full flex-col justify-between rounded-lg shadow-lg transition hover:-translate-y-2">
        <div>
          <div
            className="h-52 w-full rounded-t-lg bg-center bg-no-repeat "
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
          <Title>{title}</Title>
          <div className="flex gap-2 px-3">
            {categoryIds.map((id) => {
              const category = categories.find((category) => category.id === id);
              return (
                <span className="text-sm font-semibold text-indigo-500 " key={id}>
                  {category?.name}
                </span>
              );
            })}
          </div>
          <TextContent>{excerpt}</TextContent>
        </div>
        <PostInfo />
      </div>
    </Link>
  );
};

export default PostCard;
