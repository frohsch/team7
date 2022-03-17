import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const KuromiFactory = ({ userObj }) => {
    const [kuromi, setKuromi] = useState("");
    const [attachment, setAttachment] = useState("");
    // const 
    const onSubmit = async (event) => {
        event.preventDefault();
        if (kuromi === "") {
            return;
        }
        let attachmentUrl = "";
        if (attachment !== "") {
            // console.log(attachment);
            //파일 경로 참조 만들기
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            //storage 참조 경로로 파일 업로드 하기
            const uploadFile = await uploadString(fileRef, attachment, "data_url");
            console.log(uploadFile.ref);
            //storage에 있는 파일 URL로 다운로드 받기
            attachmentUrl = await getDownloadURL(uploadFile.ref);
        }
        
        // 메시지와 사진도 같이 firestore에 생성
        const kuromiPosting = {
            text: kuromi,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await addDoc(collection(dbService, "kuromis"), kuromiPosting);
        setKuromi("");
        setAttachment("");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setKuromi(value);
    };

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => setAttachment(null);

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={kuromi}
                    onChange={onChange}
                    type="text"
                    placeholder="할 말을 남기거라"
                    maxLength={1000}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img alt="img"
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default KuromiFactory;