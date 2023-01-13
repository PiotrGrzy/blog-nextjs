import Image from 'next/image';
import dateFormat from 'dateformat';

const mockData = {
  date: dateFormat(new Date(), 'mediumDate'),
  authorName: 'Jane Doe',
  readTime: '4 min',
};

const PostInfo = () => {
  const { authorName, readTime, date } = mockData;
  return (
    <div className="flex align-middle">
      <div className="relative m-3 mb-4 h-14 w-14">
        <Image alt="Author avatar" src={'/avatar-1.webp'} fill className=" rounded-full object-cover" />
      </div>
      <div className="flex flex-col justify-center align-baseline">
        <p className="">{authorName}</p>
        <div className="text-slate-500">
          <span>{date}</span> &#183; <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
