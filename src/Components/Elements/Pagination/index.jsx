import Button from "@/components/Elements/Button";

const Pagination = ({ page, totalPages, loading, onPrevious, onNext }) => {
  return (
    <div className="flex items-center justify-center gap-5">
      <Button
        onClick={onPrevious}
        disabled={page === 1 || loading}
        className="cursor-pointer disabled:cursor-default"
      >
        Previous
      </Button>

      <span className="text-center">
        Page {page} of {totalPages}
      </span>

      <Button
        onClick={onNext}
        disabled={page === totalPages || loading}
        className="cursor-pointer disabled:cursor-default"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
