import React, { useState } from "react";
import { dbService, storageService } from "../../firebase_";
import {v4 as uuidv4} from 'uuid';
import { map } from "@firebase/util";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "../../components/UploadAdapter";
import { useNavigate,useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark,faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import "./formStyle.css";

const TogetherForm = ({userObj}) => {
	const navigate = useNavigate();

    const [title, setTitle] = useState(""); //제목
    const [member, setMember] = useState(""); //멤버
    const [memberList, setMemberList] = useState([]);
    const [introduce, setIntroduce] = useState(""); //한줄소개
    const [tag, setTag] = useState(""); //태그
    const [tagList, setTagList] = useState([]);
    const [tagListName, setTagListName] = useState("");
    const [thumbNailUrl, setThumbNailUrl] = useState(""); //썸네일사진
    const [data, setData] = useState(""); 
    const [projectId, setProjectId] = useState(uuidv4());

    //멤버 리스트에 추가
    const onAddMemberClick = () => {  
        if (member !== 0 ) {
            setMemberList([...memberList, member])
            setMember("")
        }
    }


	// 멤버 삭제
	const onDeleteMember = (event) => {
		const newMemArray = memberList;
		newMemArray.splice(event.target.id, 1);
		setMemberList([...newMemArray]);
	}

	// 해시태그 추가
	const onAddTagListClick = () => {
		if (tag !== 0){
			setTagList([...tagList, tag]);
			setTag("");
		}
	}

	// 해시태그 삭제
	const onDeleteTagList = (event) => {
		const newTagArray = tagList;
		newTagArray.splice(event.target.id, 1);
		setTagList([...newTagArray]);
	}


    const onSubmit = async (event) => {
        //버튼을 클릭한 경우에만 제출하도록 변경
        event.preventDefault(); //새로고침 방지
        
        let attachmentUrl = "";
        if (thumbNailUrl !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(thumbNailUrl, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
			setProjectId(uuidv4());
        }
        
        const TogetherFormObj = {
            title: title,
            member: memberList,
            introduce: introduce,
            tagList: tagList,
            createdAt: Date.now(),
			creatorId: userObj.uid,
            projectId: projectId,
            content: data,
            view: 0,
            //글 작성자(멤버에 항상 포함되도록)
        };
        await dbService.collection("participateforms").add(TogetherFormObj);

        setTitle("");
        setMemberList([]);
        setIntroduce("");
        setTagList([]);
        setData("");
        setThumbNailUrl("");

		    navigate(`/together_items`, {
            replace: false,
            state: { data: TogetherFormObj.projectId },
        });
    };

    //태그 리스트에 추가
    const onKeyPressTag = (event) => {  
        if (event.target.value.length !== 0 && event.key === 'Enter') {
            setTagList([...tagList, tag])
            setTag("")
        }
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
    };


    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, title)
        }
    }

    return (
        <>
            <div className = "form_outer">
            <form className="form_container" onSubmit={false}>
                <div className="titleDiv"><div className="titlewithUpload"><div className="mainTitle">
            <span >함께해요 작성</span></div>
            {/* <div> */}
            <div style={{
                            margin: "20px 0 0 600px",
                            padding: "12px",
                            textalign: "center",
                            fontsize: "14px",
                            width: "90px",
                            height: "40px",
                            color: "#707070",
                            backgroundColor: "#CCE8FF",
                            borderRadius: "20px",
                            cursor: "pointer"
                        }}
            >
            <span
                    onClick={onSubmit}
                        style={{
                        margin: "5px",
                        width: "90px",
                        height: "40px"
                    }}>UPLOAD</span>
            </div></div>
                {/* <button className="default_Btn_Right" type="submit" onClick={onSubmit}>Upload</button> */}
            {/* </div> */}
            <div className="mainDisc">
                <span>프로젝트 팀원 모집</span></div></div>
                <div className="input_p"><div className="contentsTitle">
                    <span>제목 </span></div><hr></hr>
                    <input
                        className="input_title"
                        id="titleText"
                        type="text"
                        placeholder="제목"
                        size="30"
                        value={title}
                        onChange={onChange}
                        style={{ border: "none" }}
                        required
                    />
                </div>
                <div className="input_p"><div className="contentsTitle">
                    <span>멤버</span></div><hr></hr>
                    {/* <div style={{ display: "inline-block" }}> */}
                    <div className="input_member">
                        <input
                            className="member_title" 
                            type="text"
                            title="멤버"
                            name="memberText"
                            id="memberText"
                            placeholder="멤버추가"
                            value={member}
                            onChange={onChange}
                            // onKeyPress={onAddMemberClick}
                            style={{ boxsizing: "content-box", border: "none" }}
                        />
                        <FontAwesomeIcon 
										icon={faCirclePlus} 
										size="1x" 
										style={{paddingLeft:"10px", marginTop:"7px", cursor:"pointer"}}
										onClick={onAddMemberClick}
									/>
                    </div>


                    </div>
                    <div className="txt_memberCon">
                        {memberList.map((item, idx) => {
                            return (
                                <div className="txt_member">
                                    {item}
                                    {/* <span key={idx}>{item} </span> */}
                                    <FontAwesomeIcon id={idx} onClick={onDeleteMember} icon={faXmark} size="1x" style={{marginLeft:"10px", cursor:"pointer"}}  /> 
                                </div>
                            )
                        })}
                    {/* </div> */}
                </div>
                <div className="input_p"><div className="contentsTitle">
                    <span>한 줄 소개</span></div><hr></hr>
                    <div className="input_intro">
                    <textarea
                        
                        id="introduceText"
                        placeholder="한 줄 소개"
                        cols="70"
                        rows="3"
                        value={introduce}
                        onChange={onChange}
                        style={{ border: "none" }}
                        required
                    /></div>
                </div>
                
                <div className="input_content"><div className="contentsTitle">
                    <span>본문 작성</span></div><hr></hr><div className="CKE">
                    <CKEditor
                        editor={ClassicEditor}
						data={data}
                        config={{
                            placeholder: '내용을 입력해 주세요.',
                            extraPlugins: [ MyCustomUploadAdapterPlugin],
                        }}
                        onChange={(event, editor) => {
                            setData(editor.getData());
                        }}
                    />
                    </div>
                </div>

                <div className="input_p"><div className="contentsTitle">
                    <span className="span_tag">해시태그</span></div><hr></hr>
                    <div className="member_title">
                    <span style={{ marginRight:"5px"}}>#</span>
                    <div style={{ display: "inline-block"}}>
                        <input
                            className="member_title"
                            type="text"
                            title="태그"
                            name="tagText"
                            id="tagText"
                            placeholder="태그입력"
                            value={tag}
                            onChange={onChange}
                            onKeyPress={onKeyPressTag}
                            style={{ boxsizing: "content-box", border: "none"}}
                        /> <FontAwesomeIcon 
                        icon={faCirclePlus} 
                        size="1x" 
                        style={{cursor:"pointer"}}
                        onClick={onAddTagListClick}
                    /></div></div>
                        <div style={{ position: "absolute", top: "0px", left: "0px", visibility: "hidden", height: "0px", overflow: "scroll", whitespace: "pre", fontsize: "13px", fontweight: "400", fontstyle: "normal", letterspacing: "normal", texttransform: "none" }}></div>
                    


                    <div className="tag_List">
                        {tagList.map((item, idx) => {
                            return (
                                <div className="txt_tag">
                                    # {item}
                                    <FontAwesomeIcon id={idx} onClick={onDeleteTagList} icon={faXmark} size="1x" style={{ marginLeft:"10px", cursor:"pointer"}} />
								</div>
                            )
                        })}
                    </div>
                </div>
            </form>
            
            </div>
        </>
    );
}

export default TogetherForm;
