import React, { useState } from "react";
import { dbService, storageService } from "../../firebase";
import {v4 as uuidv4} from 'uuid';
import { map } from "@firebase/util";

const ProjectForm = ({ userObj }) => {
    const [title, setTitle] = useState(""); //제목
    const [member, setMember] = useState(""); //멤버
    const [memberList, setMemberList] = useState([]);
    const [introduce, setIntroduce] = useState(""); //한줄소개
    const [tag, setTag] = useState(""); //태그
    const [tagList, setTagList] = useState([]);
    const [mainAttachment, setMainAttachment] = useState(""); //썸네일사진
    const [header, setHeader] = useState("");
    const [context, setContext] = useState("");
    const [attachment, setAttachment] = useState("");
    const [attachmentList, setAttachmentList] = useState([]);
    const [files, setFiles] = useState([]); // 파일 리스트
    const [fileList, setFileList] = useState([]);
    const [isUploading, setUploading] = useState(false); // 업로드 상태
    const [photoURL, setPhotosURL] = useState([]); // 업로드 완료된 사진 링크들
    const [newContentList, setNewContentList] = useState([]); //소개내용추가
    const [countList, setCountList] = useState([]);

    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
    }

    // 업로드시 호출될 함수
    const handleImageUpload = async (event, fileList) => {
        event.preventDefault();
        try {
            setUploading(true);
            // 업로드의 순서는 상관없으니 Promise.all로 이미지 업로드후 저장된 url 받아오기
            const urls = await Promise.all(
                fileList?.map((file) => {
                // 스토리지 어디에 저장되게 할껀지 참조 위치를 지정. 아래와 같이 지정해줄시 images 폴더에 파일이름으로 저장
                const attachmentRef = storageService
                    .ref()
                    .child(`${title}/${uuidv4()}`);
                const response = attachmentRef.putString(attachment, "base64");
                const attachmentUrl =  response.ref.getDownloadURL();
                return attachmentUrl;
                })
            );
            setPhotosURL(urls);
            alert("성공적으로 업로드 되었습니다");
        } catch (err) {
            console.error(err);
        }

        setUploading(false);
        onClickCon(event);
    };


    const onSubmit = async (event) => {
        //버튼을 클릭한 경우에만 제출하도록 변경
        event.preventDefault(); //새로고침 방지
        
        let attachmentUrl = "";
        const projectId = uuidv4();

        if (mainAttachment !== "") {
            console.log("사진있음")
            const attachmentRef = storageService
                .ref()
                .child(`${title}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "base64");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        
        const ProjectFormObj = {
            title: title,
            member: memberList,
            introduce: introduce,
            tagList: tagList,
            content: newContentList,
            createdAt: Date.now(),
            attachmentUrl : attachmentUrl,
            projectId: projectId,
            //글 작성자(멤버에 항상 포함되도록)
        };
        await dbService.collection("projectforms").add(ProjectFormObj);

        setTitle("");
        setMemberList("");
        setIntroduce("");
        setTag("");
        setTagList([]);
        setNewContentList([]);
    };

    //태그 리스트에 추가
    const onKeyPressTag = (event) => {  
        if (event.target.value.length !== 0 && event.key === 'Enter') {
            console.log("onkeypresstag")
            setTagList([...tagList, tag])
            setTag("")
        }
    }

    //내용 리스트에 추가
    const onClickCon = (event) => {
        
        let attachmentUrl = "";
        
        // if (attachment !== "") {
        //     const attachmentRef = storageService
        //         .ref()
        //         .child(`${title}/${uuidv4()}`);
        //     const response = await attachmentRef.putString(attachment, "base64");
        //     attachmentUrl = await response.ref.getDownloadURL();
        // }
        

        const newContent = {
            header: header,
            context: context,
            attachmentUrl: attachmentUrl,
        }
        setNewContentList([...newContentList, newContent])
        setHeader("")
        setContext("")
        setAttachment("")
    }

    const deleteTagItem = (event) => {
        const deleteTagItem = event.target.parentElement.firstChild.innerText

        const filteredTagList = tagList.filter(tag => tag !== deleteTagItem)
        setTagList(filteredTagList)
    }

    const onChange = (event) => {
        const {
            target: { value },
        } = event;

        if (event.target.id === "titleText") {
            setTitle(value);
        }
        else if (event.target.id === "memberText") {
            setMember(value);
        }
        else if (event.target.id === "introduceText") {
            setIntroduce(value);
        }
        else if (event.target.id === "tagText") {
            setTag(value);
        }
        else if (event.target.id === "headerText") {
            setHeader(value);
        }
        else if (event.target.id === "contextText") {
            setContext(value);
        }
    };

    const onFileChange = (event) => {
        if(event.target.id === "mainAttachment"){
            const { 
                target: { files }, 
            } = event;
            const theFile = files[0];
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const {
                    currentTarget: { result },
                } = finishedEvent;
                setMainAttachment(result);
            };
            reader.readAsDataURL(theFile);
        }

        else if(event.target.id === "attachment"){
            console.log(event.target.files)
            for (const image of event.target.files){
                setFileList([...fileList, image]);
            }
            for(const i=1; i<fileList.size; i++){
                
                const theFile = files[i];
                const reader = new FileReader();
                reader.onloadend = (finishedEvent) => {
                    const {
                        currentTarget: { result },
                    } = finishedEvent;
                setAttachmentList([...attachmentList],result);
                reader.readAsDataURL(theFile);
            };
                
            }
            
        }
       
    };
    
    const onClearAttachment = () => setMainAttachment(null);
    const onClearAttachment2 = () => setAttachment(null);

    return (
        <>
            <h1>project form page</h1>
            <form className="form_container" onSubmit={false}>
                <p>프로젝트 소개 작성하기</p>
                <div className="input_p">
                    <span>제목 </span><hr></hr>
                    <input
                        className="input_title"
                        id="titleText"
                        type="text"
                        placeholder="제목"
                        size="30"
                        value={title}
                        onChange={onChange}
                        style={{ border: "none" }}
                    />
                </div>
                <br></br>
                <div className="input_p">
                    <span>멤버 </span><hr></hr>
                    <input
                        className="input_member"
                        id="memberText"
                        type="text"
                        placeholder="멤버 추가"
                        value={member}
                        onChange={onChange}
                        style={{ border: "none" }}
                    />
                </div>
                <br></br>
                <div className="input_p">
                    <span>한 줄 소개</span><hr></hr>
                    <textarea
                        className="input_intro"
                        id="introduceText"
                        placeholder="한 줄 소개"
                        cols="70"
                        rows="3"
                        value={introduce}
                        onChange={onChange}
                        style={{ border: "none" }}
                    />
                </div>
                <br></br>
                <div className="input_p">
                    <span className="span_img">썸네일 사진 </span><hr></hr>
                    <input
                        className="input_img"
                        id="mainAttachment"
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        style={{ border: "none" }}
                    />
                    {mainAttachment && (
                        <div className="attatchment">
                            <img src={mainAttachment} />
                            <button className="default_Btn" onClick={onClearAttachment}>Clear</button>
                        </div>
                    )}
                </div>
                <br></br>
                <div className="input_p">
                    <span>본문</span><hr></hr>
                    <input
                        type="text"
                        title="헤더"
                        name="headerText"
                        id="headerText"
                        size="50"
                        placeholder="소제목을 입력해주세요"
                        value={header}
                        onChange={onChange}
                        style={{ boxsizing: "content-box", border: "none" }}
                    />
                    <br></br><br></br>
                    <textarea
                        title="본문"
                        name="contextText"
                        id="contextText"
                        placeholder="본문입력"
                        value={context}
                        cols="70"
                        rows="3"
                        onChange={onChange}
                        style={{ boxsizing: "content-box", border: "none" }}
                    />
                    <label>
                        <input
                            multiple
                            className="input_img"
                            type="file"
                            accept="image/*"
                            id="attachment"
                            onChange={onFileChange}
                            style={{ border: "none" }}
                        />
                        {attachmentList.map((item, idx) => {
                            return(
                                <div className="attatchment">
                                    <img src={attachmentList[idx]} />
                                    <button className="default_Btn" onClick={onClearAttachment2}>Clear</button>
                                </div>
                            )
                        })}
                    </label>
                    <br></br>
                    <button onClick={(e) => handleImageUpload(e, files)}>본문 추가 완료</button>
                    <div>
                        {newContentList.map((item, idx) => {
                            return (
                                <span className="txt_tag">
                                    <span key={idx}>{item.header}</span>
                                    <p key={idx}>{item.context}</p>
                                    {item.attachment && (
                                        <img src={item.attachment} />
                                    )}
                                    {/*<button className="btn_delete" onClick={deleteTagItem}>X</button>*/}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <br></br>
                <div className="input_p">
                    <span className="span_tag">해시태그</span><hr></hr>
                    <span>#</span>
                    <div style={{ display: "inline-block" }}>
                        <input
                            type="text"
                            title="태그"
                            name="tagText"
                            id="tagText"
                            placeholder="태그입력"
                            value={tag}
                            onChange={onChange}
                            onKeyPress={onKeyPressTag}
                            style={{ boxsizing: "content-box", width: "47px", border: "none" }}
                        />
                        <div style={{ position: "absolute", top: "0px", left: "0px", visibility: "hidden", height: "0px", overflow: "scroll", whitespace: "pre", fontsize: "13px", fontweight: "400", fontstyle: "normal", letterspacing: "normal", texttransform: "none" }}></div>
                    </div>
                    <div>
                        {tagList.map((item, idx) => {
                            return (
                                <span className="txt_tag">
                                    <span key={idx}>#{item} </span>
                                    {/*<button className="btn_delete" onClick={deleteTagItem}>X</button>*/}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <button className="default_Btn_Right" type="submit" onClick={onSubmit}>제출</button>
                </div>
            </form>
        </>
    );
}

export default ProjectForm;
