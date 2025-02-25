import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default function PaginatedItems({ itemsPerPage, total, setPage }) {
  const pageCount = total / itemsPerPage;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination "
        pageLinkClassName="pagination-tag-anchor mx-2 rounded-full w-8 h-8 inline-block text-center leading-8"
        className="flex items-center justify-end list-none text-blue-500"
        activeLinkClassName="bg-blue-500 text-white"
      />
    </>
  );
}
