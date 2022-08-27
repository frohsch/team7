import React from "react";
import '../../BoardStyle/Paging.css';
import Pagination from "react-js-pagination";

const Paging = ({ page, postsPerPage, totalPosts, setPage}) => {
  
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={postsPerPage}
      totalItemsCount={totalPosts}
      pageRangeDisplayed={5}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={setPage}
    />
  );
};

export default Paging;