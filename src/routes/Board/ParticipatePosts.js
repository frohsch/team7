import React from "react";
import { useNavigate } from "react-router-dom";
import '../../BoardStyle/ParticipatePosts.css';

const ParticipatePosts = ({ posts, loading }) => {
   const navi = useNavigate();
   const linkToArticleDetail = (post) => {
      navi("/together_items", {state: {data: post.projectId}});
	  console.log(post.projectId);
    }
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
                        <th className="common-table-header">작성일</th>
                        <th className="common-table-header">조회수</th>
                     </tr>
                  </thead>
                  <tbody>
                     {posts.map(post => (
                        <tr onClick={(event) => {
                           event.stopPropagation();
                           linkToArticleDetail(post);
                         }} className="common-table-row" key={post._id}>
                           <td className="common-table-column">{"post._id"}</td>
                           <td className="common-table-column">{post.title}</td>
                           <td className="common-table-column">{"post.userName"}</td>
                           <td className="common-table-column">{
                              new Intl.DateTimeFormat("en-US", {
                                 year: "numeric",
                                 month: "2-digit",
                                 day: "2-digit",
                                 hour: "2-digit",
                                 minute: "2-digit",
                             }).format(post.createdAt)}</td>
                           <td className="common-table-column">{post.view}</td>
                        </tr>
                     ))}
                  </tbody>

               </table>
    </>
  );
};
export default ParticipatePosts;