import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase_";
import AdPosts from "./AdPosts";
import Paging from "./Paging";

function AdBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dbService.collection('adforms').get().then((res)=>{
        res.forEach((doc)=>{
          console.log(doc.data())
          setPosts((prev) => [doc.data(), ...prev]);
        })
      })
      setLoading(false);
    };
    fetchData();
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  console.log(posts);
  return (
    <div>
      <AdPosts posts={currentPosts(posts)} loading={loading}></AdPosts>
      <Paging 
        page={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        setPage={setCurrentPage}
      />
    </div>
  );
}

export default AdBoard;
