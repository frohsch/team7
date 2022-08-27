import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase_";
import ProjectPosts from "./ProjectPosts";
import Paging from "./Paging";

function ProjectBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dbService.collection('projectforms').get().then((res)=>{
        res.forEach((doc)=>{
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
    <div>
      <ProjectPosts posts={currentPosts(posts)} loading={loading}></ProjectPosts>
      <Paging 
        page={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        setPage={setCurrentPage}
      />
    </div>
  );
}

export default ProjectBoard;
