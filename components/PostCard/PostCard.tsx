import Image from 'next/image';
import Link from 'next/link';
import TextContent from '@components/ui/TextContent';
import Title from '@components/ui/Title';
import { Category, Post } from '@utils/data';

interface Props {
  post: Post;
  categories: Category[];
}

const PostCard = ({ post, categories }: Props) => {
  const { imageUrl, title, categories: categoryIds, excerpt, id } = post;
  return (
    <Link href={id.toString()}>
      <div className="rounded-lg shadow-lg hover:translate-y-2 transition h-full ">
        <Image className="rounded-t-lg" alt="Blog picture" src={imageUrl} width="600" height="400" />
        <Title>{title}</Title>
        <div className="flex px-3">
          {categoryIds.map((id) => {
            const category = categories.find((c) => c.id === id);
            return (
              <span className="text-sm text-indigo-500 font-semibold " key={id}>
                {category?.name}
              </span>
            );
          })}
        </div>
        <TextContent>{excerpt}</TextContent>
      </div>
    </Link>
  );
};

export default PostCard;
