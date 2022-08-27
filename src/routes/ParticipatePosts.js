import React from "react";
import { Link } from "react-router-dom";
import '../ParticipatePosts.css';

const ParticipatePosts = ({ posts, loading }) => {
  return (
    <>
      {loading && <div> loading... </div>}
      <table className="common-table">
                  <colgroup>
                     <col width="5%" />
                     <col width="50%" />
                     <col width="*" />
                     <col width="*" />
                     <col width="*" />
                  </colgroup>
                  <thead>
                     <tr>
                        <th className="common-table-header">번호</th>
                        <th className="common-table-header">제목</th>
                        <th className="common-table-header">작성자</th>
                        <th className="common-table-header">작성일시</th>
                        <th className="common-table-header">조회수</th>
                     </tr>
                  </thead>
                  <tbody>
                     {posts.map(post => (
                        <tr className="common-table-row" key={post._id}>
                           <td className="common-table-column">{"post._id"}</td>
                           <td className="common-table-column">{post.title}</td>
                           <td className="common-table-column">{"post.userName"}</td>
                           <td className="common-table-column">{"date"}</td>
                           <td className="common-table-column">{"post.readCount"}</td>
                        </tr>
                     ))}
                  </tbody>

               </table>
    </>
  );
};
export default ParticipatePosts;