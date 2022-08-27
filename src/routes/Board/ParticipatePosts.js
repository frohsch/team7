import React from "react";
import { Link } from "react-router-dom";
import '../../BoardStyle/ParticipatePosts.css';

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
                        <th className="common-table-header">Î≤àÌò∏</th>
                        <th className="common-table-header">?†úÎ™?</th>
                        <th className="common-table-header">?ûë?Ñ±?ûê</th>
                        <th className="common-table-header">?ûë?Ñ±?ùº?ãú</th>
                        <th className="common-table-header">Ï°∞Ìöå?àò</th>
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