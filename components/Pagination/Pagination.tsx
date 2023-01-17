import ArrowLeftIcon from '@components/Icons/ArrowLeftIcon';
import ArrowRightIcon from '@components/Icons/ArrowRightIcon';
import Button from '@components/ui/Button';

interface Props {
  currentPage: number;
  pagesTotal: number | undefined;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

const Pagination = ({ currentPage, goToNextPage, goToPrevPage, pagesTotal }: Props) => {
  return (
    <div className="m-3 my-16 flex justify-between px-4">
      <Button disabled={currentPage === 1} onClick={goToPrevPage}>
        <div className={`flex gap-2 transition ${currentPage !== 1 ? 'hover:translate-x-2' : ''}`}>
          <ArrowLeftIcon />
          Previous Page
        </div>
      </Button>
      <Button disabled={currentPage === pagesTotal} onClick={goToNextPage}>
        <div className={`flex gap-2 transition ${currentPage !== pagesTotal ? 'hover:translate-x-2' : ''}`}>
          Next Page
          <ArrowRightIcon />
        </div>
      </Button>
    </div>
  );
};

export default Pagination;
