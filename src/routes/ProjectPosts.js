import { logDOM } from "@testing-library/react";
import React from "react";
import { Link } from "react-router-dom";
import '../ProjectPosts.css';

const ProjectPosts = ({ posts, loading }) => {
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
                    <Link to="/pd"> 
                        <div className="card-wrapper">
                            <div className="card-title">{post.title}</div>
                            <div className="card-body">
                                <div className="card-body-img">
                                    <img src={"logo192.png"}/>
                                </div>
                                <div className="card-body-text">
                                    <div className="card-body-text-content">{post.introduce}</div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="username">{"userName"}</div>
                                <div className="date">{
                                    new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }).format(post.createdAt)}</div>
                                <div className="view">{"200 view"}</div>
                                <div className="heart">{"150 heart"}</div>
                            </div>
                        </div>
                    </Link>
                </div>
                ))}
        </div>
        </>
    );
};
export default ProjectPosts;