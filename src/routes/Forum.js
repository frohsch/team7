import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";
import Paging from "./Paging";

function Forum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
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
    <div className="App">
      <Posts posts={currentPosts(posts)} loading={loading}></Posts>
      <Paging 
        page={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        setPage={setCurrentPage}
      />
    </div>
  );
}

export default Forum;
