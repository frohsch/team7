import React, { useState } from "react";
import styled, { css } from 'styled-components';
import DetailList from "../../components/DetailList";
import { dbService, storageService } from "../../firebase";

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

    const onSubmit = async (event) => {
        //버튼을 클릭한 경우에만 제출하도록 변경
        event.preventDefault(); //새로고침 방지
        console.log("firebase제출");
        console.log(newContentList)
        const ProjectFormObj = {
            title: title,
            member: memberList,
            introduce: introduce,
            tagList: tagList,
            content: newContentList,
            createdAt: Date.now()
            //글 작성자(멤버에 항상 포함되도록)
            //id
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
        console.log("onclickcon")
        const newContent = {
            header: header,
            context: context,
            attachment: attachment,
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
        }
       
    };
    
    const onClearAttachment = () => setMainAttachment(null);

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
                        list="depList"
                        style={{ border: "none" }}
                    />
                    <datalist id="depList">
                        <option value="컴퓨터공학과"></option>
                        <option value="영어영문과"></option>
                        <option value="경영학과"></option>
                        <option value="사회체육과"></option>
                    </datalist>
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
                    <input
                        className="input_img"
                        type="file"
                        accept="image/*"
                        id="attachment"
                        onChange={onFileChange}
                        style={{ border: "none" }}
                    />
                    {attachment && (
                        <div className="attatchment">
                            <img src={attachment} />
                            <button className="default_Btn" onClick={onClearAttachment}>Clear</button>
                        </div>
                    )}
                    
                    <br></br>
                    <button onClick={onClickCon}>본문 추가 완료</button>
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
