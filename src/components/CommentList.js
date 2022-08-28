import { faHeart } from "@fortawesome/free-solid-svg-icons";

const CommentList = ({ userObj, userComment }) => {
    console.log("commentlist")
    console.log(userComment);
    return(
        <>
        <div className="userCommentBox">
            <p className="userName">{userObj}</p>
            <div className="userComment">{userComment}</div>
            <p className="userHeart">
                <faHeart />
            </p>
        </div>
        </>
    )
}
export default CommentList;