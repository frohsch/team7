import React from "react";
import { Link } from "react-router-dom";
import '../../BoardStyle/ProjectPosts.css';

const ProjectPosts = ({ posts, loading }) => {
    return (
        <>
        <div style={{
            display: "grid",
            gridTemplateRows: "1fr ",
            gridTemplateColumns: "1fr 1fr 1fr",
            marginLeft: "5vw",
        }}>
            {loading && <div> loading... </div>}
                {posts.map((post) => (
                <div key={post.id}>
					
                    <Link to="/project_items" state={{data:post.projectId}}> 
                        <div className="card-wrapper">
                            <div className="card-title">{post.title}</div>
                            <div className="card-body">
                                <div className="card-body-img">

                                    <img src={post.thumbnailUrl}/>
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
                                <div className="view">{post.view+"  👀"}</div>
                                <div className="heart">{"150 ❤️"}</div>
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