import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase_";
import Paging from "./Paging";
import axios from "axios";
import ParticipatePosts from "./ParticipatePosts";

function ParticipateBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dbService.collection('participateforms').get().then((res)=>{
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

  return (
    <div className="container">
      <ParticipatePosts posts={currentPosts(posts)} loading={loading}></ParticipatePosts>
      <Paging 
        page={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        setPage={setCurrentPage}
      />
    </div>
  );
}

export default ParticipateBoard;