import { logDOM } from "@testing-library/react";
import React from "react";
import '../Posts.css';

const Posts = ({ posts, loading }) => {
  return (
    <>
    
    <div style={{
        display: "grid",
        gridTemplateRows: "1fr ",
        gridTemplateColumns: "1fr 1fr 1fr",
      }}>
        {loading && <div> loading... </div>}
            {posts.map((post) => (
            <div key={post.id}>
                <div className="card-wrapper">
                    <div className="card-body-title">{post.title}</div>
                    <div className="card-body">
                        <div className="card-body-img">
                            <img src={"logo192.png"}/>
                        </div>
                        <div className="card-body-text">
                            <div className="card-body-text-content">{post.body}</div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="username">{"userName"}</div>
                        <div className="date">{"date"}</div>
                        <div className="view">{"200 view"}</div>
                        <div className="heart">{"150 heart"}</div>
                    </div>
                </div>
            </div>
            ))}
    </div>
    </>
  );
};
export default Posts;