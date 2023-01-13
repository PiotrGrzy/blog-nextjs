import Header from '@components/Header';
import ArrowLeft from '@components/Icons/ArrowLeft';
import Heading from '@components/ui/Heading';
import TextContent from '@components/ui/TextContent';
import { getAllPosts, getPostData, Post } from '@utils/data';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

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

const Post: NextPage<Props> = ({ postData }) => {
  const { title, excerpt, imageUrl } = postData;
  return (
    <div className="p-2 pt-0 ">
      <Header />
      <Image className="mx-auto" alt="post image" src={imageUrl} width={1000} height={600} />
      <Heading>{title}</Heading>
      <h2 className="mb-4 text-center">{excerpt}</h2>
      <TextContent>{exampleContent}</TextContent>
      <div className="my-2 flex justify-center gap-2 align-middle text-indigo-500 ">
        <ArrowLeft />
        <Link href="/">Back to other posts</Link>
      </div>
    </div>
  );
};

export default Post;

const exampleContent =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, animi unde. Quod ipsam est consequatur eligendi obcaecati modi id corrupti assumenda harum, fuga corporis eaque laborum, dolorem similique? Aspernatur nemo impedit vero eum quia temporibus, quos culpa quis! Minus ipsum necessitatibus placeat tenetur deserunt molestias tempora facere aut eos omnis quibusdam, repellendus quas ex.\n Rem dicta fuga alias necessitatibus iusto veritatis nemo voluptatum in a! Alias qui nemo, incidunt dolorum unde nisi nihil illum. Deleniti nesciunt itaque placeat velit fugit nemo modi nihil laborum fugiat quibusdam! Debitis provident accusamus at hic cum, est eaque rerum culpa? Fugiat minima numquam ut aliquid, eligendi optio, eveniet nostrum facere dolorum sint quae quam laboriosam incidunt nobis quaerat voluptatibus molestias quas amet quos ipsum, enim inventore. Optio esse saepe culpa reprehenderit voluptate amet repellendus asperiores, necessitatibus doloremque quod perferendis quasi veniam, sit ex dolorum eum ipsam rerum minus accusamus modi atque perspiciatis impedit. Facere voluptas obcaecati dolores sed aut eveniet.\n Corporis dicta, beatae rem odio id alias ex deleniti odit ratione et animi eos sed ad inventore esse fuga quibusdam? Distinctio et illo unde, beatae laboriosam eius ipsa non pariatur rerum architecto, aliquid facere ducimus magnam hic. Voluptas veniam tempore consequatur aliquam. Distinctio maiores iure nam id in optio velit quam excepturi minus iste exercitationem quisquam quae provident ab earum nobis delectus enim quod eos facere, numquam repellat odit hic. Harum ipsa magni consequatur repudiandae quas id magnam temporibus dolore. Doloribus expedita, fuga, sint maiores cupiditate minima quis neque inventore aliquid quibusdam consectetur tempora! Debitis, eaque officia. Eaque, nobis aut maxime iusto quibusdam mollitia maiores error fuga vitae eius atque asperiores nemo quia repudiandae pariatur placeat ad est molestiae quos! Unde illum blanditiis minima ipsum sit incidunt, facilis aperiam et esse pariatur mollitia quas nam placeat ullam, optio nulla odio culpa! Voluptate, voluptas autem voluptatem doloribus adipisci doloremque modi molestiae ad dicta totam error fuga consectetur. Perspiciatis repellendus non dolorem autem accusantium atque dignissimos architecto eos nemo earum ab corrupti iure, quod nobis! Adipisci possimus id alias nihil facilis dicta provident mollitia, maxime dolor magnam ipsum veritatis explicabo tenetur reiciendis minus atque esse excepturi repellat voluptas aperiam incidunt similique? Provident doloribus libero quidem temporibus ullam neque perspiciatis, deleniti magnam nesciunt animi minus omnis quisquam accusantium voluptates laboriosam, veniam illum, nostrum quod? Minus autem odio quos, officia sint magni alias officiis! Distinctio omnis nemo praesentium corporis blanditiis provident! Sunt, at. Quas, accusantium praesentium cupiditate odio doloribus, adipisci dicta aut quisquam eum beatae doloremque corporis quidem quis ex, explicabo at distinctio qui! Deserunt exercitationem soluta nulla inventore magnam in, temporibus eos aut. Obcaecati nostrum corporis magni nam autem accusamus magnam neque? Aliquam vel ut aperiam sunt similique, autem, quam molestias commodi in, nemo laboriosam cupiditate? Laboriosam, iusto illum odio cupiditate provident nobis modi quo necessitatibus id cumque fugiat, a veniam sapiente, delectus cum sunt atque nisi dignissimos fuga ea harum expedita? Porro vero natus similique vel!\n\n Ea nemo recusandae asperiores doloribus nulla dicta ipsum voluptate cupiditate, non in accusamus fuga et, sint deserunt id, dolore ipsa saepe fugit velit. Magnam sequi, deleniti, voluptatum distinctio est fugit alias sint quisquam, numquam molestiae laborum eius blanditiis nemo exercitationem quis officiis libero error repellat dolorum doloribus! Sit deleniti veniam, harum, possimus aliquam voluptatibus labore blanditiis architecto itaque quisquam, corporis sed laboriosam! Aspernatur asperiores sint consequuntur minima earum ipsam suscipit, beatae natus. Esse veniam velit cum! Accusamus error ipsum dolore saepe minima tempore dolorem molestias. Porro facilis officia iusto! Commodi possimus reprehenderit nostrum dolorem voluptatibus alias obcaecati, voluptates qui, maiores dolores quo nam architecto itaque, eveniet ducimus et sit! Nemo non soluta dolores laborum est ut odio sint recusandae? Numquam!';
