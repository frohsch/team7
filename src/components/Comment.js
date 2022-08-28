import { map, uuidv4 } from "@firebase/util";
import { dbService } from "firebase_";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import './Comment.css';

const Comment = ({ userObj, id, tag }) => {
    const [comment, setComment] = useState("");
    const [commentObj, setCommentObj] = useState([]);
    const [list, setList] = useState([]);
    const [isValid, setIsValid] = useState(false);

    // 모든 commentlist 불러오기
    useEffect(() => {
        dbService.collection(`${tag}`).doc(`${id}`).collection("comment").orderBy('createdAt').get().then((결과)=>{
            결과.forEach((doc)=>{
                const commentObj = {
                    id: doc.id,
                    ...doc.data(),
                }
                setCommentObj(commentObj)
                list.push(commentObj);
            })
        });
    }, []);

    const onSubmitComment = async (event) => {
        const commentObj = {
            text: comment,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            userName: userObj.displayName,
        }
        list.push(commentObj)

        event.preventDefault();
        await dbService.doc(`${tag}/${id}`).collection("comment").add({
            text: comment,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            userName: userObj.displayName,
        });
        console.log(comment);
        setComment("");
    }

    return (
        <div className="comment_wrapper">
            <div className="input">
                <input
                    type="text"
                    className="inputComment"
                    placeholder="댓글 달기..."
                    onChange={e => {
                        setComment(e.target.value);
                    }}
                    onKeyUp={e => {
                        e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
                    }}
                    value={comment}
                />
                <button
                    type="button"
                    className={
                        comment.length > 0 ? 'submitCommentActvie' : 'submintCommentInactive'
                    }
                    onClick={onSubmitComment}
                    disabled={isValid ? false : true}
                >게시</button>
            </div>
            <div className="cLine"></div>
            {list.map((item)=>{
                return (
                    <p className="comment_body">
                        <p className="it">{item.text} </p>
                        <p className="dt">{new Intl.DateTimeFormat("en-US", {
                                 year: "numeric",
                                 month: "2-digit",
                                 day: "2-digit",
                                 hour: "2-digit",
                                 minute: "2-digit",
                             }).format(item.createdAt)}</p>
                    </p>
                )
            })}
        </div>
    )

}

export default Comment;