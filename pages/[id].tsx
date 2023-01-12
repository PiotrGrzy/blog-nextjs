import { getAllPosts, getPostData, Post } from '@utils/data';
import Image from 'next/image';

export const getStaticPaths = async () => {
  const posts = await getAllPosts();

  const paths = posts.map((post) => {
    return { params: { id: post.id.toString() } };
  });

  return {
    paths,
    fallback: false, // check which one
  };
};

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const postData = await getPostData(params.id);
  console.log(postData);

  return {
    props: {
      postData,
    },
  };
};

interface Props {
  postData: Post;
}

const Post = ({ postData }: Props) => {
  const { title, excerpt, imageUrl } = postData;
  return (
    <div className="p-2 rounded-lg ">
      <h1>{title}</h1>
      <p>{excerpt}</p>
      {/* <Image alt="post image" src={imageUrl} width={400} height={400} /> */}
    </div>
  );
};

export default Post;
